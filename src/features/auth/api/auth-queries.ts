import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "../stores/auth-store.ts"
import { authApi } from "./auth-api"
import { queryKeys } from "@/shared/api/query-keys.ts"
import { toast } from "sonner"

export const useLoginMutation = () => {
  const { login } = useAuthStore()

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: data => {
      login(data.user, data.token)
      toast.success("Zalogowano pomyślnie!")
    },
    onError: (error: any) => {
      toast.error("Błąd logowania: " + error.message)
    },
  })
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      toast.success("Rejestracja zakończona pomyślnie!")
    },
    onError: (error: any) => {
      toast.error("Błąd rejestracji: " + error.message)
    },
  })
}

export const useLogoutMutation = () => {
  const { logout } = useAuthStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout()
      queryClient.clear()
      toast.success("Wylogowano pomyślnie!")
    },
  })
}

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: queryKeys.auth.user,
    queryFn: authApi.getCurrentUser,
    staleTime: 5 * 60 * 1000,
  })
}
