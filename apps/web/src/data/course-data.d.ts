export interface LessonSeed {
    order: number;
    title: string;
    keyPoints: string[];
    contentHtml: string;
}
export interface QuizSeed {
    title: string;
    version: number;
    questions: {
        order: number;
        prompt: string;
        options: {
            label: string;
            text: string;
        }[];
        correctIndex: number;
    }[];
}
export interface CourseCatalogItem {
    id: string;
    title: string;
    subject: string;
    description: string;
    offlinePackageSizeMb: number;
    lessons: LessonSeed[];
    quizzes: QuizSeed[];
}
export declare const COURSE_CATALOG: CourseCatalogItem[];
//# sourceMappingURL=course-data.d.ts.map