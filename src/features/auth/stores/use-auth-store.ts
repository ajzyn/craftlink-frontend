import { create } from "zustand"
import type { UserDto } from "@/features/auth/types/auth-types"

interface AuthActions {
   setUser: (user: UserDto) => void
   setAccessToken: (token: string) => void
   login: (user: UserDto, token: string) => void
   logout: () => void
   setIsLoading: (value: boolean) => void
}

interface AuthState {
   user: UserDto | null
   accessToken: string | null
   isAuthenticated: boolean
   isLoading: boolean
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

   setIsLoading: value => set({ isLoading: value }),
}))
