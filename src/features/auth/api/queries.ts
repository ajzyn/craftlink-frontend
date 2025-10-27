import { useQuery } from "@tanstack/react-query"
import { authApi } from "@/features/auth/api/api"
import { authKeys } from "@/features/auth/api/keys"

export const useGetCurrentUserQuery = () =>
   useQuery({
      queryKey: authKeys.currentUser,
      queryFn: authApi.getCurrentUser,
   })
