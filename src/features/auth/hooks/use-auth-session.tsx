import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { useRouter } from "@tanstack/react-router"
import { toast } from "sonner"
import { useLogoutMutation } from "../api/mutations"

export const useAuthSession = () => {
   const user = useAuthStore(state => state.user)
   const logout = useAuthStore(state => state.logout)
   const isLoading = useAuthStore(state => state.isLoading)
   const router = useRouter()
   const { mutateAsync: logoutMutation } = useLogoutMutation()

   const handleLogout = async () => {
      try {
         await logoutMutation()
         toast.success("Wylogowano pomyślnie!")
      } catch (error) {
         toast.error("Logout failed")
         console.warn("Logout failed. User is logged out locally:", error)
      } finally {
         logout()
         router.navigate({ to: "/" })
      }
   }

   return {
      user,
      handleLogout,
      isLoading,
   }
}
