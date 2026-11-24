import type { CoursePack, ContentItem } from '@/db/types';
export type DownloadProgressFn = (pct: number, message: string) => void;
export declare function downloadCoursePack(courseId: string, courseTitle: string, subject: string, onProgress?: DownloadProgressFn): Promise<void>;
export declare function computeSHA256(data: string): Promise<string>;
export declare function deleteCoursePack(courseId: string): Promise<void>;
export declare function getPackStatus(courseId: string): Promise<CoursePack | undefined>;
export declare function getAllPacks(): Promise<CoursePack[]>;
export declare function getLocalLesson(lessonId: string): Promise<any>;
export declare function getLocalQuiz(quizVersionId: string): Promise<any>;
export declare function getLocalLessonsForCourse(courseId: string): Promise<ContentItem[]>;
export declare function getLocalQuizForCourse(courseId: string): Promise<ContentItem>;
export declare function getLocalQuizzesForCourse(courseId: string): Promise<ContentItem[]>;
//# sourceMappingURL=downloadEngine.d.ts.map