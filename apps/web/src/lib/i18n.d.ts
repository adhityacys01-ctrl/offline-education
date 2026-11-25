export type SupportedLanguage = 'en' | 'hi' | 'mr';
export declare const LANGUAGE_LABELS: Record<SupportedLanguage, string>;
export declare const LANG_STORAGE_KEY = "learnhub_preferred_lang";
interface LanguageStoreState {
    language: SupportedLanguage;
    setLanguage: (lang: SupportedLanguage) => void;
}
export declare const useLanguageStore: import("zustand").UseBoundStore<import("zustand").StoreApi<LanguageStoreState>>;
export declare const TRANSLATIONS: Record<SupportedLanguage, Record<string, string>>;
export declare const SUBJECT_TRANSLATIONS: Record<string, Record<SupportedLanguage, string>>;
export declare const COURSE_TITLES: Record<string, Record<SupportedLanguage, string>>;
export declare function useI18n(): {
    language: SupportedLanguage;
    setLanguage: (lang: SupportedLanguage) => void;
    t: (key: string, fallback?: string) => string;
    translateSubject: (subject: string) => string;
    translateCourseTitle: (courseIdOrTitle: string, defaultTitle?: string) => string;
};
export {};
//# sourceMappingURL=i18n.d.ts.map