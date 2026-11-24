export type Theme = 'light' | 'dark';
interface UIState {
    sidebarOpen: boolean;
    activeModal: string | null;
    theme: Theme;
    setSidebarOpen: (open: boolean) => void;
    toggleSidebar: () => void;
    openModal: (id: string) => void;
    closeModal: () => void;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}
export declare const useUIStore: import("zustand").UseBoundStore<import("zustand").StoreApi<UIState>>;
export {};
//# sourceMappingURL=uiStore.d.ts.map