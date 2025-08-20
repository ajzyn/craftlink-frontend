import { create } from "zustand"
import type { AuthState, UserDto } from "@/features/auth/types/auth"

interface AuthActions {
   setUser: (user: UserDto) => void
   setAccessToken: (token: string) => void
   login: (user: UserDto, token: string) => void
   logout: () => void
   setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState & AuthActions>(set => ({
   user: null,
   accessToken: null,
   isAuthenticated: false,
   isLoading: false,

   setUser: user => set({ user, isAuthenticated: true }),

   setAccessToken: token => set({ accessToken: token }),

   login: (user, token) =>
      set({
         user,
         accessToken: token,
         isAuthenticated: true,
      }),

   logout: () =>
      set({
         user: null,
         accessToken: null,
         isAuthenticated: false,
      }),

   setLoading: loading => set({ isLoading: loading }),
}))
