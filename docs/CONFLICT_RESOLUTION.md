# 🔄 Conflict Resolution Specification & Rules

> **Offline Learning Platform — Data Durability & Distributed Sync Protocol**
> This document details the documented rules applied when offline client state and server state conflict.

---

## 1. Overview of Conflict Philosophy

In an offline-first learning system, devices operate in disconnected environments for hours or days. When connectivity resumes, concurrent mutations, dropped network responses, or multi-device sync can lead to data conflicts.

Our architecture resolves conflicts using **deterministic, zero-data-loss conflict resolution rules** rooted in distributed systems principles (CRDTs, Idempotency, and Content-Addressable Cryptographic Hashes).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CONFLICT RESOLUTION TAXONOMY                          │
├──────────────────────┬─────────────────────────────┬────────────────────────┤
│ Entity               │ Resolution Strategy         │ Code Enforcement       │
├──────────────────────┼─────────────────────────────┼────────────────────────┤
│ 1. Lesson Progress   │ Monotonic CRDT Grow-Only    │ apps/web: database.ts  │
│ 2. Quiz Submissions  │ First-Commit-Wins + Hash    │ apps/api: submissions  │
│ 3. Answer Drafts     │ Monotonic Revision Sequence │ apps/web: attemptMgr   │
│ 4. Course Content    │ SHA-256 Content-Addressable │ apps/web: downloadEng  │
│ 5. Dropped Receipts  │ Reconcile-Before-Resend     │ apps/web: syncEngine   │
└──────────────────────┴─────────────────────────────┴────────────────────────┘
```

---

## 2. Documented Conflict Rules

### Rule 1: Lesson Progress — Monotonic Grow-Only Rule (CRDT)
* **Scenario**: A student completes a lesson on Device A while offline. Device B (or a stale server backup) has the lesson marked as incomplete.
* **The Rule**: **Completion is monotonic and irreversible (Grow-Only Set / G-Counter)**.
  - An offline device can transition a lesson from `completed: false` → `completed: true`.
  - Stale offline syncs or server rollbacks can **never** revert a completed lesson back to incomplete.
* **Implementation**:
  - `apps/web/src/db/database.ts` (`markLessonComplete`):
    ```ts
    export async function markLessonComplete(studentId: string, lessonId: string, courseId: string): Promise<void> {
      const id = `${studentId}::${lessonId}`;
      const existing = await db.progress.get(id);
      if (existing?.completed) return; // Monotonic: already complete, reject rollback
      await db.progress.put({ id, studentId, lessonId, courseId, completed: true, updatedAt: Date.now() });
    }
    ```

---

### Rule 2: Quiz Submissions — Idempotent First-Commit-Wins with Payload Verification
* **Scenario**: A student submits a quiz offline. On reconnection, multiple upload requests trigger due to retry loops, flaky cellular signals, or multi-tab instances.
* **The Rule**: **First-Commit-Wins with cryptographic payload match and exact receipt replay**.
  - **Identical Payload Resubmission**: If the server receives a submission with an `idempotencyKey` that already exists and the SHA-256 `payloadHash` matches, it does **not** re-grade, re-insert, or duplicate records. It returns the original canonical graded receipt with `replayed: true`.
  - **Payload Tampering / Hash Mismatch**: If an `idempotencyKey` is reused with a altered payload hash, the server immediately rejects the request with HTTP 409 `ConflictException('IDEMPOTENCY_KEY_REUSE')`.
* **Database Guard**:
  - `apps/api/prisma/schema.prisma`:
    - `@@unique([studentId, clientAttemptId], name: "uq_submission_student_attempt")`
    - `@@unique([studentId, routeScope, idempotencyKey], name: "uq_idempotency_scope_key")`
    - `@@unique([submissionId, questionId], name: "uq_submission_question")`
  - `apps/api/src/submissions/submissions.service.ts`:
    ```ts
    if (existing) {
      if (existing.payloadHash !== dto.payloadHash) {
        throw new ConflictException('IDEMPOTENCY_KEY_REUSE');
      }
      if (existing.responseJson) {
        return { ...(existing.responseJson as object), replayed: true };
      }
    }
    ```

---

### Rule 3: Answer Drafts — Monotonic Revision Sequencing
* **Scenario**: A student changes their answer multiple times while offline, or the browser restarts during an assessment.
* **The Rule**: **Highest Monotonic Revision Number wins**.
  - Every modification to an answer increments an integer `revision` sequence (`revision = (existing?.revision ?? 0) + 1`).
  - Answers are written to IndexedDB within a read-write transaction before any UI confirmation is displayed (Write-Ahead Durability).
  - When finalized, the frozen payload bundles the exact revision sequence.
* **Implementation**:
  - `apps/web/src/services/attemptManager.ts` (`saveAnswerTransactionally`):
    ```ts
    const id = `${clientAttemptId}::${questionId}`;
    const existing = await db.answers.get(id);
    const revision = (existing?.revision ?? 0) + 1;
    await db.answers.put({ id, clientAttemptId, questionId, selectedOptionId, revision, savedAt: Date.now() });
    ```

---

### Rule 4: Content Versioning — Content-Addressable Cryptographic Hash (SHA-256)
* **Scenario**: A teacher publishes an updated version of a lesson or quiz while students have an older version saved locally.
* **The Rule**: **Cryptographic Content-Addressable Hash Match**.
  - Every downloaded content item is verified against the server-published SHA-256 manifest hash using the Web Crypto API (`crypto.subtle.digest('SHA-256', ...)`).
  - If server content changes, the manifest hash changes. Stale local packs are flagged for download and cannot corrupt active student attempts tied to an existing `quizVersionId`.
* **Implementation**:
  - `apps/web/src/services/downloadEngine.ts` (`downloadCoursePack` & `computeSHA256`).

---

### Rule 5: Network Ambiguity (Dropped Response) — Reconcile-Before-Resend
* **Scenario**: The client uploads a quiz submission. The server receives, validates, and stores it in PostgreSQL, but the network drops before the HTTP 200 response reaches the client. The client is now unsure whether the submission succeeded.
* **The Rule**: **Reconcile server state before triggering destructive retries**.
  - Before sending a duplicate POST request, the Sync Engine queries `GET /api/v1/sync/attempts/:clientAttemptId`.
  - If the server has the submission, the client fetches the receipt, stores it in `db.syncReceipts`, and transitions outbox status to `SENT` without sending another POST.
* **Implementation**:
  - `apps/web/src/services/syncEngine.ts` (`reconcileAmbiguousItems`).

---

## 3. Guarantees Summary

| Guarantee | Mechanism | Result |
| :--- | :--- | :--- |
| **Zero Answer Loss** | IndexedDB Write-Ahead Transaction | Answers persist across app restarts, reboots, and crashes. |
| **Zero Duplicate Records** | DB Unique Constraints + Idempotency Table | Duplicate network packets replay the same receipt. |
| **Tamper Detection** | SHA-256 Payload Hash Verification | Payload changes under same key raise HTTP 409 Conflict. |
| **Progress Integrity** | Monotonic CRDT Rule | Completed status can never be rolled back by stale data. |
| **Cross-Tab Safety** | IndexedDB Distributed Mutex Lock | Multiple tabs will not submit the same payload concurrently. |
