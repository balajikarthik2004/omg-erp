import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthSession, AuthUser } from '@/features/auth/types/auth.types'

interface AuthState {
  token: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  setSession: (session: AuthSession) => void
  clearSession: () => void
}

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setSession: (session) =>
        set({
          token: session.accessToken,
          user: session.user,
          isAuthenticated: true,
        }),
      clearSession: () => set(initialState),
    }),
    {
      name: 'omg-auth-store',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
