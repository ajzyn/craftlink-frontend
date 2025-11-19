import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { toast } from "sonner"
import { useLogoutMutation } from "../api/mutations"
import { useShallow } from "zustand/react/shallow"

export const useAuthSession = () => {
   const { user, logout, isLoading } = useAuthStore(
      useShallow(state => ({
         user: state.user,
         logout: state.logout,
         isLoading: state.isLoading,
      })),
   )
   const { mutateAsync: logoutMutation } = useLogoutMutation()

   const handleLogout = async () => {
      try {
         await logoutMutation()
         toast.success("Wylogowano pomyślnie!")
      } catch (error) {
         console.warn("Logout failed. User is logged out locally:", error)
      } finally {
         logout()
      }
   }

   return {
      user,
      handleLogout,
      isLoading,
   }
}
