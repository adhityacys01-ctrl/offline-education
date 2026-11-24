import type { UserDto } from '@contracts/index';
interface AuthState {
    user: UserDto | null;
    accessToken: string | null;
    setAuth: (user: UserDto, token: string) => void;
    clearAuth: () => void;
}
export declare const useAuthStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<AuthState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<AuthState, {
            user: UserDto | null;
            accessToken: string | null;
        }>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: AuthState) => void) => () => void;
        onFinishHydration: (fn: (state: AuthState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<AuthState, {
            user: UserDto | null;
            accessToken: string | null;
        }>>;
    };
}>;
export {};
//# sourceMappingURL=authStore.d.ts.map