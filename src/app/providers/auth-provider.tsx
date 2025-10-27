import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { useGetCurrentUserQuery } from "@/features/auth/api/queries"
import { type ReactNode, useEffect } from "react"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const { setUser, setIsLoading, clearUser, accessToken } = useAuthStore()

   const { data: user, error, refetch, isLoading: isFetching } = useGetCurrentUserQuery()

   useEffect(() => {
      if (user) {
         setUser(user)
      } else if (error) {
         clearUser()
      }
   }, [user, error, setUser, clearUser, setIsLoading])

   useEffect(() => {
      setIsLoading(isFetching)
   }, [isFetching, setIsLoading])

   useEffect(() => {
      if (accessToken) {
         refetch()
      }
   }, [accessToken, refetch])

   return children
}
