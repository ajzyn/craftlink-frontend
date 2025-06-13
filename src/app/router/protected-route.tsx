import { Navigate } from "@tanstack/react-router"
import { useAuthStore } from "@/features/auth/stores/auth-store.ts"
import type { ReactNode } from "react"

interface ProtectedRouteProps {
  children: ReactNode
  requiredAuthorities?: string[]
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
