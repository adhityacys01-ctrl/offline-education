export declare class ApiError extends Error {
    readonly statusCode: number;
    readonly errorCode: string;
    constructor(statusCode: number, errorCode: string, message: string);
}
export declare function fetchCourses(): Promise<CourseListItem[]>;
export declare function fetchCourse(courseId: string): Promise<CourseDetail>;
export declare function fetchAllQuizzes(): Promise<QuizListItem[]>;
export declare function fetchOfflineManifest(courseId: string): Promise<OfflineManifest>;
export declare function fetchLesson(lessonId: string): Promise<LessonContent>;
export declare function fetchQuizVersion(quizVersionId: string): Promise<QuizContent>;
export declare function submitAttempt(payload: SubmitPayload, idempotencyKey: string): Promise<SubmissionReceipt>;
export declare function reconcileAttempt(clientAttemptId: string): Promise<ReconcileResponse>;
export interface CourseListItem {
    id: string;
    title: string;
    subject: string;
    description: string;
    coverImageUrl?: string;
    lessonCount: number;
    quizCount: number;
    offlinePackageSizeMb: number;
}
export interface CourseDetail {
    id: string;
    title: string;
    subject: string;
    description: string;
    coverImageUrl?: string;
    offlinePackageSizeMb: number;
    lessons: {
        id: string;
        title: string;
        order: number;
        keyPoints: string[];
    }[];
    quizVersions: {
        id: string;
        title: string;
        version: number;
    }[];
}
export interface QuizListItem {
    quizVersionId: string;
    courseId: string;
    courseTitle: string;
    subject: string;
    title: string;
    version: number;
    questionCount: number;
    timeLimitMins: number;
}
export interface OfflineManifest {
    packId: string;
    courseId: string;
    courseTitle: string;
    version: number;
    manifestHash: string;
    totalSizeMb: number;
    contentItems: ManifestItem[];
}
export interface ManifestItem {
    id: string;
    type: 'lesson' | 'quiz' | 'asset';
    url: string;
    sha256: string;
    sizeBytes: number;
    title: string;
    order: number;
}
export interface LessonContent {
    id: string;
    courseId: string;
    courseTitle: string;
    subject: string;
    title: string;
    order: number;
    contentHtml: string;
    keyPoints: string[];
    mediaUrl?: string;
    mediaType?: string;
    contentHash: string;
    updatedAt: string;
}
export interface QuizContent {
    id: string;
    courseId: string;
    courseTitle: string;
    title: string;
    version: number;
    contentHash: string;
    questions: {
        id: string;
        order: number;
        prompt: string;
        options: {
            id: string;
            label: string;
            text: string;
        }[];
    }[];
}
export interface SubmitPayload {
    clientAttemptId: string;
    quizVersionId: string;
    idempotencyKey: string;
    payloadHash: string;
    answers: {
        questionId: string;
        selectedOptionId: string | null;
        revision: number;
    }[];
    startedAt: string;
    finalizedAt: string;
}
export interface SubmissionReceipt {
    submissionId: string;
    clientAttemptId: string;
    studentId: string;
    quizVersionId: string;
    acceptedAt: string;
    status: string;
    score?: number;
    totalQuestions?: number;
    receiptHash: string;
}
export interface ReconcileResponse {
    found: boolean;
    submissionId?: string;
    status?: string;
    acceptedAt?: string;
    receiptHash?: string;
}
//# sourceMappingURL=api.d.ts.map