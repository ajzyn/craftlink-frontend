import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import type { ReactNode } from "react"
import type { Authority } from "@/features/auth/types/auth-types"
import { Navigate } from "@tanstack/react-router"

interface ProtectedRouteProps {
   children: ReactNode
   requiredAuthorities?: Authority[]
}

export const ProtectedRoute = ({ children, requiredAuthorities = [] }: ProtectedRouteProps) => {
   const { user } = useAuthStore()

   if (!user) return <Navigate to="/login" />
   if (
      requiredAuthorities.length > 0 &&
      !requiredAuthorities.some(auth => user.authorities.includes(auth))
   ) {
      return <div>Brak dostępu</div>
   }

   return <>{children}</>
}
