import { create } from "zustand"
import type { UserDto } from "@/features/auth/api/types"
import { subscribeWithSelector } from "zustand/middleware"
import { wsClient } from "@/shared/api/websocket-client"
import { router } from "@/app/router/builder"
import { isNil } from "lodash"

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

export const useAuthStore = create(
   subscribeWithSelector<AuthState & AuthActions>(set => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: user => set({ user, isAuthenticated: true }),

      setAccessToken: token => {
         console.log("📝 setAccessToken called", { hasToken: !!token })

         set({ accessToken: token })
      },

      login: (user, token) =>
         set({
            user,
            accessToken: token,
            isAuthenticated: true,
         }),

      logout: () => {
         set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
         })

         if (window.location.pathname !== "/") {
            router.navigate({ to: "/" })
         }
      },

      clearUser: () =>
         set({ user: null, isAuthenticated: false, isLoading: false, accessToken: null }),

      setIsLoading: value => set({ isLoading: value }),
   })),
)

useAuthStore.subscribe(
   state => state.accessToken,
   (token, prevToken) => {
      if (wsClient.isActive() && !isNil(token) && token !== prevToken) {
         console.log("🔄 Triggering WS reconnect from middleware")
         wsClient.reconnect(token ?? undefined)
      }
   },
)

useAuthStore.subscribe(state => state.isAuthenticated, wsClient.disconnect) //TODO: handle case when user with opened chat is logging in
