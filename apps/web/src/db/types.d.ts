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
export interface OfflineLessonTranslation {
    id: string;
    serverId: string;
    lessonId: string;
    courseId: string;
    language: 'en' | 'hi' | 'mr';
    translatedTitle: string;
    translatedContent: string;
    revision: number;
    approvalStatus: string;
    savedAt: number;
}
export interface OfflineGlossaryEntry {
    id: string;
    lessonId: string;
    courseId: string;
    term: string;
    enDef: string;
    hiDef?: string | null;
    mrDef?: string | null;
    enEquiv?: string | null;
    hiEquiv?: string | null;
    mrEquiv?: string | null;
    approvalStatus: string;
    savedAt: number;
}
export interface OfflineAudioCache {
    id: string;
    lessonId: string;
    language: 'en' | 'hi' | 'mr';
    fileRef?: string | null;
    blob?: Blob;
    ttsLangCode: string;
    savedAt: number;
}
//# sourceMappingURL=types.d.ts.map