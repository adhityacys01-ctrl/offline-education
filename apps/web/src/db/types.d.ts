export type CoursePack_Status = 'NOT_DOWNLOADED' | 'DOWNLOADING' | 'VERIFYING' | 'AVAILABLE_OFFLINE' | 'FAILED' | 'STALE';
export interface CoursePack {
    id: string;
    courseId: string;
    courseTitle: string;
    subject: string;
    version: number;
    manifestHash: string;
    totalSizeMb: number;
    status: CoursePack_Status;
    downloadedAt?: number;
    lastVerifiedAt?: number;
    progressPct: number;
    errorMessage?: string;
}
export interface ContentItem {
    id: string;
    courseId: string;
    packId: string;
    type: 'lesson' | 'quiz';
    title: string;
    order: number;
    contentJson: string;
    sha256: string;
    sizeBytes: number;
    savedAt: number;
}
export type AttemptStatus = 'DRAFT' | 'QUEUED' | 'SENDING' | 'SYNCED' | 'RETRYABLE_ERROR' | 'ACTION_REQUIRED';
export interface Attempt {
    clientAttemptId: string;
    quizVersionId: string;
    courseId: string;
    quizTitle: string;
    status: AttemptStatus;
    idempotencyKey?: string;
    payloadHash?: string;
    startedAt: number;
    finalizedAt?: number;
    lastLocalSaveAt: number;
}
export interface Answer {
    id: string;
    clientAttemptId: string;
    questionId: string;
    selectedOptionId: string | null;
    revision: number;
    answerJson: string;
    savedAt: number;
}
export type OutboxStatus = 'PENDING' | 'SENDING' | 'SENT' | 'FAILED_RETRYABLE' | 'FAILED_FATAL';
export interface OutboxItem {
    outboxId: string;
    clientAttemptId: string;
    idempotencyKey: string;
    payload: string;
    payloadHash: string;
    status: OutboxStatus;
    retryCount: number;
    nextRetryAt: number;
    lastError?: string;
    lockId?: string;
    lockExpiresAt?: number;
    createdAt: number;
}
export interface SyncReceipt {
    clientAttemptId: string;
    submissionId: string;
    acceptedAt: string;
    receiptHash: string;
    score?: number;
    totalQuestions?: number;
    savedAt: number;
}
export interface LessonProgress {
    id: string;
    studentId: string;
    lessonId: string;
    courseId: string;
    completed: boolean;
    position?: number;
    updatedAt: number;
}
//# sourceMappingURL=types.d.ts.map