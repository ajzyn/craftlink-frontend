import { authApi } from "./auth-api"
import { useBaseMutation } from "@/shared/api/use-base-mutation"

export const useLoginMutation = () =>
   useBaseMutation(authApi.login, {
      invalidateKeys: [["currentUser"]], //TODO: move to keys
   })

export const useRegisterMutation = () =>
   useBaseMutation(authApi.register, {
      invalidateKeys: [["currentUser"]],
   })

export const useLogoutMutation = () =>
   useBaseMutation(authApi.logout, {
      invalidateKeys: [["currentUser"]],
   })
