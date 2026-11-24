import { create } from 'zustand';
function getInitialTheme() {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || saved === 'light')
            return saved;
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
            return 'dark';
    }
    return 'light';
}
function applyTheme(theme) {
    if (typeof document !== 'undefined') {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    }
}
const initialTheme = getInitialTheme();
applyTheme(initialTheme);
export const useUIStore = create((set) => ({
    sidebarOpen: true,
    activeModal: null,
    theme: initialTheme,
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    openModal: (id) => set({ activeModal: id }),
    closeModal: () => set({ activeModal: null }),
    setTheme: (theme) => {
        applyTheme(theme);
        localStorage.setItem('theme', theme);
        set({ theme });
    },
    toggleTheme: () => {
        set((s) => {
            const next = s.theme === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem('theme', next);
            return { theme: next };
        });
    },
}));
//# sourceMappingURL=uiStore.js.map