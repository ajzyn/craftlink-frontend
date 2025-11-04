import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import type { ReactNode } from "react"
import type { Authority } from "@/features/auth/api/types"
import { Navigate } from "@tanstack/react-router"
import { useBreakpoint } from "@/shared/hooks/use-breakpoint"
import { toast } from "sonner"

interface ProtectedRouteProps {
   children: ReactNode
   requiredAuthorities?: Authority[]
}

export const ProtectedRoute = ({ children, requiredAuthorities = [] }: ProtectedRouteProps) => {
   const user = useAuthStore(state => state.user)
   const { isMobile } = useBreakpoint()

   const navigateDefaultPage = () => <Navigate to={isMobile ? "/login" : "/"} />

   if (!user) {
      return navigateDefaultPage()
   }

   if (
      requiredAuthorities.length > 0 &&
      !requiredAuthorities.some(auth => user.authorities.includes(auth))
   ) {
      toast.error("Nie masz dostępu do tej strony.")
      return navigateDefaultPage()
   }

   return <>{children}</>
}
