import { authApi } from "./api"
import { useBaseMutation } from "@/shared/api/use-base-mutation"

export const useLoginMutation = () =>
   useBaseMutation(authApi.login, {
      invalidateKeys: [authKeys.currentUser],
   })

export const useRegisterMutation = () =>
   useBaseMutation(authApi.register, {
      invalidateKeys: [authKeys.currentUser],
   })

export const useLogoutMutation = () =>
   useBaseMutation(authApi.logout, {
      invalidateKeys: [authKeys.currentUser],
   })
