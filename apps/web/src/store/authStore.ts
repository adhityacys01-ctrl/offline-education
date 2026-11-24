import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserDto } from '@contracts/index'

interface AuthState {
  user: UserDto | null
  accessToken: string | null
  setAuth: (user: UserDto, token: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (user, accessToken) => set({ user, accessToken }),
      clearAuth: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'olp-auth',
      partialize: (state) => ({ user: state.user, accessToken: state.accessToken }),
    }
  )
)
