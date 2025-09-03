import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { useRouter } from "@tanstack/react-router"
import { useLogoutMutation } from "@/features/auth/api/auth-queries"
import { toast } from "sonner"

export const useAuthNavigation = () => {
   const { user, logout, isLoading } = useAuthStore()
   const router = useRouter()
   const { mutateAsync: logoutMutation } = useLogoutMutation()

   const handleLogout = async () => {
      try {
         await logoutMutation()
         toast.success("Wylogowano pomyślnie!")
      } catch (error) {
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
