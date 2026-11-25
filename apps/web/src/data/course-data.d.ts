export interface QuestionSeed {
    order: number;
    prompt: string;
    correctIndex: number;
    options: {
        label: string;
        text: string;
    }[];
}
export interface QuizSeed {
    title: string;
    version: number;
    questions: QuestionSeed[];
}
export interface TranslationSeed {
    title: string;
    contentHtml: string;
    keyPoints?: string[];
}
export interface GlossarySeed {
    term: string;
    enDef: string;
    hiDef?: string;
    mrDef?: string;
    enEquiv?: string;
    hiEquiv?: string;
    mrEquiv?: string;
}
export interface LessonSeed {
    order: number;
    title: string;
    contentHtml: string;
    keyPoints: string[];
    translations?: {
        hi?: TranslationSeed;
        mr?: TranslationSeed;
    };
    glossary?: GlossarySeed[];
}
export interface CourseSeed {
    id: string;
    title: string;
    subject: string;
    description: string;
    offlinePackageSizeMb: number;
    lessons: LessonSeed[];
    quizzes: QuizSeed[];
}
export declare const COURSE_CATALOG: CourseSeed[];
//# sourceMappingURL=course-data.d.ts.map