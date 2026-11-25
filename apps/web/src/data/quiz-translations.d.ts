export interface TranslatedOption {
    label: string;
    text: string;
}
export interface TranslatedQuestion {
    prompt: string;
    options: string[];
}
export interface QuizTranslationContent {
    title: string;
    questions: TranslatedQuestion[];
}
export declare const QUIZ_TRANSLATIONS: Record<string, {
    hi: QuizTranslationContent;
    mr: QuizTranslationContent;
}>;
export declare function getQuizTranslation(quizTitle: string, lang: 'en' | 'hi' | 'mr'): QuizTranslationContent | null;
//# sourceMappingURL=quiz-translations.d.ts.map