export interface LoginDto {
    email: string;
    password: string;
    role: 'student' | 'teacher' | 'admin';
}
export interface SignupDto {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'teacher' | 'admin';
}
export interface AuthResponseDto {
    accessToken: string;
    user: UserDto;
}
export interface UserDto {
    id: string;
    email: string;
    name: string;
    role: 'student' | 'teacher' | 'admin';
    avatarUrl?: string;
}
export interface AdminUserListItemDto {
    id: string;
    email: string;
    name: string;
    role: 'student' | 'teacher' | 'admin';
    createdAt: string;
}
export interface AdminSyncFailureDto {
    id: string;
    studentId: string;
    studentName: string;
    routeScope: string;
    idempotencyKey: string;
    payloadHash: string;
    createdAt: string;
    expiresAt: string;
}
export interface AdminAuditLogEntryDto {
    id: string;
    actorId: string | null;
    actorName?: string;
    eventType: string;
    correlationId: string | null;
    clientAttemptId: string | null;
    idempotencyKey: string | null;
    metadata: unknown;
    createdAt: string;
}
export interface ConflictPolicyDto {
    id: string;
    name: string;
    strategy: string;
    description: string;
    status: 'active';
}
export interface CourseDto {
    id: string;
    title: string;
    subject: string;
    description: string;
    coverImageUrl?: string;
    lessonCount: number;
    quizCount: number;
    offlinePackageSizeMb: number;
    isEnrolled: boolean;
}
export interface LessonDto {
    id: string;
    courseId: string;
    title: string;
    order: number;
    contentHtml: string;
    keyPoints: string[];
    mediaUrl?: string;
    mediaType?: 'video' | 'image' | 'pdf';
}
export interface QuizVersionDto {
    id: string;
    courseId: string;
    title: string;
    version: number;
    contentHash: string;
    questions: QuestionDto[];
}
export interface QuestionDto {
    id: string;
    quizVersionId: string;
    order: number;
    prompt: string;
    options: OptionDto[];
}
export interface OptionDto {
    id: string;
    label: string;
    text: string;
}
export interface OfflineManifestDto {
    packId: string;
    courseId: string;
    courseTitle: string;
    version: number;
    manifestHash: string;
    totalSizeMb: number;
    contentItems: ManifestContentItemDto[];
}
export interface ManifestContentItemDto {
    id: string;
    type: 'lesson' | 'quiz' | 'asset';
    url: string;
    sha256: string;
    sizeBytes: number;
}
export interface SubmitAttemptDto {
    clientAttemptId: string;
    quizVersionId: string;
    idempotencyKey: string;
    payloadHash: string;
    answers: AnswerDto[];
    startedAt: string;
    finalizedAt: string;
}
export interface AnswerDto {
    questionId: string;
    selectedOptionId: string | null;
    revision: number;
}
export interface SubmissionReceiptDto {
    submissionId: string;
    clientAttemptId: string;
    studentId: string;
    quizVersionId: string;
    acceptedAt: string;
    status: 'RECEIVED' | 'GRADED';
    score?: number;
    totalQuestions?: number;
    receiptHash: string;
}
export interface SyncReconcileResponseDto {
    found: boolean;
    submissionId?: string;
    status?: string;
    acceptedAt?: string;
    receiptHash?: string;
}
export interface TeacherSubmissionListItemDto {
    submissionId: string;
    studentName: string;
    studentEmail: string;
    courseTitle: string;
    quizTitle: string;
    quizVersion: number;
    clientAttemptId: string;
    status: 'RECEIVED' | 'GRADED';
    score?: number;
    totalQuestions?: number;
    acceptedAt: string;
}
export interface TeacherSubmissionDetailDto extends TeacherSubmissionListItemDto {
    idempotencyKey: string;
    payloadHash: string;
    receiptHash: string;
    answers: TeacherAnswerDto[];
}
export interface TeacherAnswerDto {
    questionPrompt: string;
    selectedOptionText: string | null;
    isCorrect?: boolean;
    revision: number;
}
export type ApiErrorCode = 'VALIDATION_ERROR' | 'AUTH_REQUIRED' | 'FORBIDDEN' | 'NOT_FOUND' | 'IDEMPOTENCY_KEY_REUSE' | 'ATTEMPT_ALREADY_FINALIZED' | 'QUIZ_VERSION_REVOKED' | 'NOT_ENROLLED' | 'RATE_LIMITED' | 'INTERNAL_ERROR';
export interface ApiErrorDto {
    statusCode: number;
    errorCode: ApiErrorCode;
    message: string;
    correlationId?: string;
}
export type SupportedLanguage = 'en' | 'hi' | 'mr';
export declare const LANGUAGE_LABELS: Record<SupportedLanguage, string>;
export interface ImportPassageDto {
    lessonId?: string;
    sourceTitle: string;
    rawText: string;
    protectedTerms?: string[];
}
export interface GenerateTranslationDto {
    lessonId: string;
    sourceTitle: string;
    sourceContent: string;
    targetLanguages: SupportedLanguage[];
    protectedTerms?: string[];
}
export interface ValidationTokenStatusDto {
    original: string;
    found: boolean;
    count: number;
    expected: number;
}
export interface ValidationResultDto {
    passed: boolean;
    warnings: string[];
    errors: string[];
    preservedTokens: ValidationTokenStatusDto[];
}
export interface LessonTranslationDto {
    id: string;
    lessonId: string;
    sourceVersion: number;
    language: SupportedLanguage;
    translatedTitle: string;
    translatedContent: string;
    revision: number;
    validationStatus: 'PENDING' | 'PASSED' | 'FAILED' | 'WARNINGS';
    validationReport?: ValidationResultDto;
    approvalStatus: 'DRAFT' | 'GENERATED' | 'VALIDATED' | 'REVIEW' | 'APPROVED' | 'PUBLISHED';
    approverId?: string | null;
    publishedAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
}
export interface GlossaryEntryDto {
    id: string;
    translationId: string;
    lessonId: string;
    term: string;
    enDef: string;
    hiDef?: string | null;
    mrDef?: string | null;
    enEquiv?: string | null;
    hiEquiv?: string | null;
    mrEquiv?: string | null;
    approvalStatus: string;
    revision: number;
}
export interface LessonAudioDto {
    id: string;
    translationId: string;
    language: SupportedLanguage;
    revision: number;
    fileRef?: string | null;
    durationSeconds?: number | null;
    sizeBytes?: number | null;
    generationStatus: 'PENDING' | 'GENERATING' | 'READY' | 'FAILED';
    ttsLangCode?: string;
}
export interface TranslationAuditDto {
    id: string;
    translationId: string;
    actorId: string;
    action: string;
    prevRevision?: number | null;
    newRevision: number;
    metadata?: unknown;
    createdAt: string;
}
//# sourceMappingURL=index.d.ts.map