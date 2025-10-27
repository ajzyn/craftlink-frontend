import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { useGetCurrentUserQuery } from "@/features/auth/api/queries"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const setUser = useAuthStore(s => s.setUser)
   const clearUser = useAuthStore(s => s.clearUser)

   const { data, error } = useGetCurrentUserQuery()

   useEffect(() => {
      if (data) {
         setUser(data)
      } else if (error) {
         clearUser()
      }
   }, [data, error, setUser, clearUser])

   return children
}
