// ─── Attempt Manager ──────────────────────────────────────────────────────────
// Manages the full lifecycle of a quiz attempt in IndexedDB:
//   DRAFT → (answers autosaved) → QUEUED → (outbox sync) → SYNCED
//
// Core guarantee: every answer is committed to IndexedDB BEFORE the UI
// confirms "Saved on this device". The UI never confirms ahead of a
// successful write.
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/db/database';
import { computeSHA256 } from './downloadEngine';
// ── Create or resume an attempt ───────────────────────────────────────────────
export async function getOrCreateAttempt(quizVersionId, courseId, quizTitle) {
    // Check for an existing DRAFT attempt for this quiz version
    const existing = await db.attempts
        .where('quizVersionId').equals(quizVersionId)
        .filter((a) => a.status === 'DRAFT')
        .first();
    if (existing)
        return existing;
    // Create a fresh attempt
    const attempt = {
        clientAttemptId: uuidv4(),
        quizVersionId,
        courseId,
        quizTitle,
        status: 'DRAFT',
        startedAt: Date.now(),
        lastLocalSaveAt: Date.now(),
    };
    await db.attempts.put(attempt);
    return attempt;
}
// ── Atomically save one answer ────────────────────────────────────────────────
// DURABILITY CONTRACT:
//   Opens a rw transaction on [attempts, answers].
//   Increments revision, writes answer, updates lastLocalSaveAt.
//   Awaits commit before returning — UI shows "Saved" only after this.
export async function saveAnswerTransactionally(clientAttemptId, questionId, selectedOptionId) {
    let savedAnswer;
    await db.transaction('rw', [db.attempts, db.answers], async () => {
        const id = `${clientAttemptId}::${questionId}`;
        const existing = await db.answers.get(id);
        const revision = (existing?.revision ?? 0) + 1;
        const answer = {
            id,
            clientAttemptId,
            questionId,
            selectedOptionId,
            revision,
            answerJson: JSON.stringify({ selectedOptionId }),
            savedAt: Date.now(),
        };
        await db.answers.put(answer);
        await db.attempts.where('clientAttemptId').equals(clientAttemptId).modify({
            lastLocalSaveAt: Date.now(),
        });
        savedAnswer = answer;
    });
    return savedAnswer;
}
// ── Finalize attempt → QUEUED (immutable outbox entry) ────────────────────────
export async function finalizeAttempt(clientAttemptId) {
    const attempt = await db.attempts.get(clientAttemptId);
    if (!attempt)
        throw new Error('Attempt not found');
    if (attempt.status !== 'DRAFT')
        throw new Error('Attempt is not in DRAFT state');
    const answers = await db.answers
        .where('clientAttemptId').equals(clientAttemptId)
        .toArray();
    // Build canonical payload
    const payload = {
        clientAttemptId,
        quizVersionId: attempt.quizVersionId,
        answers: answers.map((a) => ({
            questionId: a.questionId,
            selectedOptionId: a.selectedOptionId,
            revision: a.revision,
        })),
        startedAt: new Date(attempt.startedAt).toISOString(),
        finalizedAt: new Date().toISOString(),
    };
    const payloadJson = JSON.stringify(payload);
    const payloadHash = await computeSHA256(payloadJson);
    const idempotencyKey = uuidv4();
    const outboxId = uuidv4();
    const now = Date.now();
    // Atomically: freeze attempt + create outbox entry
    await db.transaction('rw', [db.attempts, db.outbox], async () => {
        await db.attempts.where('clientAttemptId').equals(clientAttemptId).modify({
            status: 'QUEUED',
            idempotencyKey,
            payloadHash,
            finalizedAt: now,
            lastLocalSaveAt: now,
        });
        await db.outbox.put({
            outboxId,
            clientAttemptId,
            idempotencyKey,
            payload: payloadJson,
            payloadHash,
            status: 'PENDING',
            retryCount: 0,
            nextRetryAt: now,
            createdAt: now,
        });
    });
    return idempotencyKey;
}
// ── Get attempt + all its answers (for resume) ────────────────────────────────
export async function loadAttemptWithAnswers(clientAttemptId) {
    const attempt = await db.attempts.get(clientAttemptId);
    if (!attempt)
        return null;
    const answerList = await db.answers
        .where('clientAttemptId').equals(clientAttemptId)
        .toArray();
    const answers = {};
    for (const a of answerList) {
        answers[a.questionId] = a;
    }
    return { attempt, answers };
}
// ── Get pending outbox count (for dashboard badge) ────────────────────────────
export async function getPendingOutboxCount() {
    return db.outbox
        .where('status')
        .anyOf(['PENDING', 'SENDING', 'FAILED_RETRYABLE'])
        .count();
}
//# sourceMappingURL=attemptManager.js.map