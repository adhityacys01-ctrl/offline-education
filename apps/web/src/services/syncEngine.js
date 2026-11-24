// ─── Sync Engine ──────────────────────────────────────────────────────────────
// Phase 4: Durable outbox synchronization protocol.
//
// Guarantees:
//  1. At-least-once transport delivery (retries until server confirms)
//  2. Exactly-once logical processing (via idempotency key — enforced server-side, Phase 5)
//  3. Cross-tab safety (lease-based lock prevents parallel uploads of same item)
//  4. Zero answer loss (answers stay in IndexedDB regardless of network fate)
//
// Trigger sources:
//  - App launch (foreground)
//  - window 'online' event
//  - document 'visibilitychange' (tab focus)
//  - Manual "Retry Now" call
//  - Internal retry timer (after backoff delay)
import { db } from '@/db/database';
import { submitAttempt, reconcileAttempt, ApiError } from '@/lib/api';
import { v4 as uuidv4 } from 'uuid';
// ── Constants ─────────────────────────────────────────────────────────────────
const LOCK_TTL_MS = 30000; // Cross-tab lock expires after 30s
const BASE_BACKOFF_MS = 2000; // 2s base
const MAX_BACKOFF_MS = 60000; // 60s ceiling
const MAX_RETRIES_FATAL = 10; // After this many retries → FAILED_FATAL
// ── Single in-flight guard (within-tab) ──────────────────────────────────────
let isSyncing = false;
// ─────────────────────────────────────────────────────────────────────────────
// BACKOFF: Exponential with full jitter
//   delay = random(0, min(MAX, BASE * 2^retryCount))
// ─────────────────────────────────────────────────────────────────────────────
function computeBackoffMs(retryCount) {
    const cap = Math.min(MAX_BACKOFF_MS, BASE_BACKOFF_MS * Math.pow(2, retryCount));
    return Math.floor(Math.random() * cap);
}
// ─────────────────────────────────────────────────────────────────────────────
// CROSS-TAB LOCK via IndexedDB
//   Each outbox item stores lockId + lockExpiresAt.
//   Another tab will not pick up an item whose lock is still valid.
// ─────────────────────────────────────────────────────────────────────────────
async function acquireLock(outboxId) {
    const lockId = uuidv4();
    const now = Date.now();
    let acquired = false;
    await db.transaction('rw', db.outbox, async () => {
        const item = await db.outbox.get(outboxId);
        if (!item)
            return;
        // Check if another tab holds a valid lock
        const hasActiveLock = item.lockId &&
            item.lockExpiresAt &&
            item.lockExpiresAt > now;
        if (hasActiveLock)
            return; // Another tab owns this — skip
        // Acquire lock
        await db.outbox.update(outboxId, {
            lockId,
            lockExpiresAt: now + LOCK_TTL_MS,
            status: 'SENDING',
        });
        acquired = true;
    });
    return acquired ? lockId : null;
}
async function releaseLock(outboxId, lockId) {
    await db.transaction('rw', db.outbox, async () => {
        const item = await db.outbox.get(outboxId);
        if (item?.lockId === lockId) {
            await db.outbox.update(outboxId, {
                lockId: undefined,
                lockExpiresAt: undefined,
            });
        }
    });
}
// ─────────────────────────────────────────────────────────────────────────────
// DISPATCH: Send one outbox item to the backend
// ─────────────────────────────────────────────────────────────────────────────
async function dispatchOutboxItem(item) {
    const lockId = await acquireLock(item.outboxId);
    if (!lockId)
        return; // Another tab is handling this
    try {
        const payload = JSON.parse(item.payload);
        // ── POST /api/v1/submissions (idempotent) ─────────────────────────────
        const receipt = await submitAttempt(payload, item.idempotencyKey);
        // ── Success: write canonical receipt + mark SYNCED ────────────────────
        await db.transaction('rw', [db.outbox, db.attempts, db.syncReceipts], async () => {
            // Store receipt for client verification
            await db.syncReceipts.put({
                clientAttemptId: item.clientAttemptId,
                submissionId: receipt.submissionId,
                acceptedAt: receipt.acceptedAt,
                receiptHash: receipt.receiptHash,
                score: receipt.score,
                totalQuestions: receipt.totalQuestions,
                savedAt: Date.now(),
            });
            // Mark attempt as SYNCED
            await db.attempts
                .where('clientAttemptId')
                .equals(item.clientAttemptId)
                .modify({ status: 'SYNCED' });
            // Mark outbox item as SENT
            await db.outbox.update(item.outboxId, {
                status: 'SENT',
                lockId: undefined,
                lockExpiresAt: undefined,
            });
        });
        console.log(`[SyncEngine] ✅ Synced: ${item.clientAttemptId.slice(0, 8)}…`);
    }
    catch (err) {
        await releaseLock(item.outboxId, lockId);
        await handleDispatchFailure(item, err);
    }
}
// ─────────────────────────────────────────────────────────────────────────────
// FAILURE HANDLER: Categorise error and schedule retry or quarantine
// ─────────────────────────────────────────────────────────────────────────────
async function handleDispatchFailure(item, err) {
    const isFatal = isNonRetryableError(err);
    const nextRetryCount = item.retryCount + 1;
    const isExhausted = nextRetryCount >= MAX_RETRIES_FATAL;
    if (isFatal || isExhausted) {
        // ── Quarantine: FAILED_FATAL — answers preserved, requires manual review
        await db.outbox.update(item.outboxId, {
            status: 'FAILED_FATAL',
            retryCount: nextRetryCount,
            lastError: err instanceof Error ? err.message : String(err),
        });
        await db.attempts
            .where('clientAttemptId')
            .equals(item.clientAttemptId)
            .modify({ status: 'ACTION_REQUIRED' });
        console.warn(`[SyncEngine] ⛔ Fatal: ${item.clientAttemptId.slice(0, 8)}… — ${err}`);
        return;
    }
    // ── Retryable: schedule next attempt with backoff ─────────────────────────
    const delay = computeBackoffMs(nextRetryCount);
    await db.outbox.update(item.outboxId, {
        status: 'FAILED_RETRYABLE',
        retryCount: nextRetryCount,
        nextRetryAt: Date.now() + delay,
        lastError: err instanceof Error ? err.message : String(err),
    });
    await db.attempts
        .where('clientAttemptId')
        .equals(item.clientAttemptId)
        .modify({ status: 'RETRYABLE_ERROR' });
    console.warn(`[SyncEngine] ⚠ Retry #${nextRetryCount} in ${Math.round(delay / 1000)}s: ${item.clientAttemptId.slice(0, 8)}…`);
    // Schedule the next retry
    setTimeout(() => processOutbox(), delay);
}
// ─────────────────────────────────────────────────────────────────────────────
// ERROR CLASSIFICATION
// ─────────────────────────────────────────────────────────────────────────────
function isNonRetryableError(err) {
    if (err instanceof ApiError) {
        // 400 (malformed) or 409 (finalized conflict)
        // 401 & 403 are retryable so local answers are never discarded
        return [400, 409].includes(err.statusCode);
    }
    return false;
}
// ─────────────────────────────────────────────────────────────────────────────
// RECONCILE: Check server state for SENDING items whose response was dropped
// (The classic split-brain scenario — server committed but client never got receipt)
// ─────────────────────────────────────────────────────────────────────────────
async function reconcileAmbiguousItems() {
    const now = Date.now();
    const staleMs = LOCK_TTL_MS * 2;
    // Find items that were SENDING but whose lock has expired (dropped response)
    const staleItems = await db.outbox
        .filter((o) => o.status === 'SENDING' &&
        o.lockExpiresAt !== undefined &&
        o.lockExpiresAt < now - staleMs)
        .toArray();
    for (const item of staleItems) {
        try {
            const result = await reconcileAttempt(item.clientAttemptId);
            if (result.found && result.submissionId) {
                // Server has it! Write receipt and mark SYNCED
                await db.transaction('rw', [db.outbox, db.attempts, db.syncReceipts], async () => {
                    await db.syncReceipts.put({
                        clientAttemptId: item.clientAttemptId,
                        submissionId: result.submissionId,
                        acceptedAt: result.acceptedAt,
                        receiptHash: result.receiptHash,
                        savedAt: Date.now(),
                    });
                    await db.attempts
                        .where('clientAttemptId')
                        .equals(item.clientAttemptId)
                        .modify({ status: 'SYNCED' });
                    await db.outbox.update(item.outboxId, {
                        status: 'SENT', lockId: undefined, lockExpiresAt: undefined,
                    });
                });
                console.log(`[SyncEngine] 🔍 Reconciled: ${item.clientAttemptId.slice(0, 8)}…`);
            }
            else {
                // Server doesn't have it — treat as retryable
                await db.outbox.update(item.outboxId, {
                    status: 'FAILED_RETRYABLE',
                    lockId: undefined, lockExpiresAt: undefined,
                    nextRetryAt: Date.now(),
                });
            }
        }
        catch {
            // Reconcile itself failed — network issue, will retry later
            await db.outbox.update(item.outboxId, {
                status: 'FAILED_RETRYABLE',
                lockId: undefined, lockExpiresAt: undefined,
                nextRetryAt: Date.now() + computeBackoffMs(item.retryCount),
            });
        }
    }
}
// ─────────────────────────────────────────────────────────────────────────────
// MAIN OUTBOX PROCESSOR
// ─────────────────────────────────────────────────────────────────────────────
export async function processOutbox(force = false) {
    if (isSyncing)
        return;
    if (!navigator.onLine)
        return;
    isSyncing = true;
    try {
        // First, reconcile any stale SENDING items
        await reconcileAmbiguousItems();
        const now = Date.now();
        // If forced (e.g. user tapped "Sync Now"), unlock and queue all pending/retryable items
        if (force) {
            const items = await db.outbox
                .filter((o) => o.status === 'PENDING' || o.status === 'FAILED_RETRYABLE' || o.status === 'FAILED_FATAL')
                .toArray();
            for (const item of items) {
                await db.outbox.update(item.outboxId, {
                    status: 'PENDING',
                    nextRetryAt: 0,
                    lockId: undefined,
                    lockExpiresAt: undefined,
                    lastError: undefined,
                });
            }
        }
        // Pick up all items that are ready to send
        const pending = await db.outbox
            .filter((o) => (o.status === 'PENDING' || o.status === 'FAILED_RETRYABLE') &&
            (force || (o.nextRetryAt ?? 0) <= now))
            .toArray();
        // Process sequentially (not parallel) to avoid race conditions
        for (const item of pending) {
            if (!navigator.onLine)
                break; // Stop if we went offline mid-process
            await dispatchOutboxItem(item);
        }
    }
    finally {
        isSyncing = false;
    }
}
// ─────────────────────────────────────────────────────────────────────────────
// ENGINE LIFECYCLE: Register all trigger sources
// ─────────────────────────────────────────────────────────────────────────────
let engineStarted = false;
export function startSyncEngine() {
    if (engineStarted)
        return () => { };
    engineStarted = true;
    // Trigger on network restoration
    const handleOnline = () => {
        console.log('[SyncEngine] 🌐 Network restored — processing outbox');
        processOutbox();
    };
    // Trigger on tab becoming visible (user switched back to tab)
    const handleVisibility = () => {
        if (document.visibilityState === 'visible') {
            processOutbox();
        }
    };
    window.addEventListener('online', handleOnline);
    document.addEventListener('visibilitychange', handleVisibility);
    // Initial sweep on engine start
    processOutbox();
    // Polling fallback: check every 30s for items whose retry timer has elapsed
    const pollInterval = setInterval(() => processOutbox(), 30000);
    // Return cleanup function
    return () => {
        engineStarted = false;
        window.removeEventListener('online', handleOnline);
        document.removeEventListener('visibilitychange', handleVisibility);
        clearInterval(pollInterval);
    };
}
// ─────────────────────────────────────────────────────────────────────────────
// MANUAL RETRY: User-triggered "Retry Now" for a specific outbox item
// ─────────────────────────────────────────────────────────────────────────────
export async function retryOutboxItem(outboxId) {
    await db.outbox.update(outboxId, {
        status: 'PENDING',
        nextRetryAt: Date.now(),
        lastError: undefined,
    });
    await processOutbox();
}
// ─────────────────────────────────────────────────────────────────────────────
// RETRY ALL: User-triggered global "Retry All" from SyncStatusPage
// ─────────────────────────────────────────────────────────────────────────────
export async function retryAllOutboxItems() {
    const failed = await db.outbox
        .where('status')
        .anyOf(['FAILED_RETRYABLE', 'FAILED_FATAL'])
        .toArray();
    for (const item of failed) {
        await db.outbox.update(item.outboxId, {
            status: 'PENDING',
            nextRetryAt: Date.now(),
            lastError: undefined,
            retryCount: 0,
        });
        // Also reset attempt status
        await db.attempts
            .where('clientAttemptId')
            .equals(item.clientAttemptId)
            .modify({ status: 'QUEUED' });
    }
    await processOutbox();
}
//# sourceMappingURL=syncEngine.js.map