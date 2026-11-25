import Dexie, { type Table } from 'dexie';
import type { CoursePack, ContentItem, Attempt, Answer, OutboxItem, SyncReceipt, LessonProgress, OfflineLessonTranslation, OfflineGlossaryEntry, OfflineAudioCache } from './types';
export declare class OfflineLearningDB extends Dexie {
    coursePacks: Table<CoursePack, string>;
    contentItems: Table<ContentItem, string>;
    attempts: Table<Attempt, string>;
    answers: Table<Answer, string>;
    outbox: Table<OutboxItem, string>;
    syncReceipts: Table<SyncReceipt, string>;
    progress: Table<LessonProgress, string>;
    lessonTranslations: Table<OfflineLessonTranslation, string>;
    glossaryEntries: Table<OfflineGlossaryEntry, string>;
    audioCache: Table<OfflineAudioCache, string>;
    constructor();
}
export declare const db: OfflineLearningDB;
/** Save or update a course pack entry */
export declare function upsertCoursePack(pack: CoursePack): Promise<void>;
/** Atomically save an answer, incrementing revision */
export declare function saveAnswer(answer: Answer): Promise<void>;
/** Get all answers for an attempt, ordered by questionId */
export declare function getAnswersForAttempt(clientAttemptId: string): Promise<Answer[]>;
/** Mark a lesson as completed (monotonic — cannot un-complete) */
export declare function markLessonComplete(studentId: string, lessonId: string, courseId: string): Promise<void>;
//# sourceMappingURL=database.d.ts.map