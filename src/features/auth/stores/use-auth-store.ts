import { create } from "zustand"
import type { UserDto } from "@/features/auth/api/types"

interface AuthActions {
   setUser: (user: UserDto) => void
   setAccessToken: (token: string) => void
   login: (user: UserDto, token: string) => void
   logout: VoidFunction
   setIsLoading: (value: boolean) => void
   clearUser: VoidFunction
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
   isLoading: true,

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

   clearUser: () =>
      set({ user: null, isAuthenticated: false, isLoading: false, accessToken: null }),

   setIsLoading: value => set({ isLoading: value }),
}))
