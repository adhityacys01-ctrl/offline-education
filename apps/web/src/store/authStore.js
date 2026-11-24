import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useAuthStore = create()(persist((set) => ({
    user: null,
    accessToken: null,
    setAuth: (user, accessToken) => set({ user, accessToken }),
    clearAuth: () => set({ user: null, accessToken: null }),
}), {
    name: 'olp-auth',
    partialize: (state) => ({ user: state.user, accessToken: state.accessToken }),
}));
//# sourceMappingURL=authStore.js.map