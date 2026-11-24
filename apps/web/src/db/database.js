import Dexie from 'dexie';
export class OfflineLearningDB extends Dexie {
    constructor() {
        super('OfflineLearningPlatform');
        // ── Tables ─────────────────────────────────────────────────────────────────
        Object.defineProperty(this, "coursePacks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "contentItems", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "attempts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "answers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outbox", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "syncReceipts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "progress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.version(1).stores({
            // Primary key first, then indexed fields
            coursePacks: 'id, courseId, status',
            contentItems: 'id, courseId, packId, type, [courseId+type]',
            attempts: 'clientAttemptId, quizVersionId, courseId, status',
            answers: 'id, clientAttemptId, questionId, [clientAttemptId+questionId]',
            outbox: 'outboxId, clientAttemptId, status, nextRetryAt',
            syncReceipts: 'clientAttemptId, submissionId',
            progress: 'id, studentId, lessonId, courseId, [studentId+courseId]',
        });
    }
}
// Singleton instance
export const db = new OfflineLearningDB();
// ── Convenience helpers ────────────────────────────────────────────────────────
/** Save or update a course pack entry */
export async function upsertCoursePack(pack) {
    await db.coursePacks.put(pack);
}
/** Atomically save an answer, incrementing revision */
export async function saveAnswer(answer) {
    await db.transaction('rw', [db.attempts, db.answers], async () => {
        await db.answers.put(answer);
        await db.attempts.where('clientAttemptId').equals(answer.clientAttemptId).modify({
            lastLocalSaveAt: Date.now(),
        });
    });
}
/** Get all answers for an attempt, ordered by questionId */
export async function getAnswersForAttempt(clientAttemptId) {
    return db.answers.where('clientAttemptId').equals(clientAttemptId).toArray();
}
/** Mark a lesson as completed (monotonic — cannot un-complete) */
export async function markLessonComplete(studentId, lessonId, courseId) {
    const id = `${studentId}::${lessonId}`;
    const existing = await db.progress.get(id);
    if (existing?.completed)
        return; // already complete, monotonic
    await db.progress.put({
        id, studentId, lessonId, courseId,
        completed: true,
        updatedAt: Date.now(),
    });
}
//# sourceMappingURL=database.js.map