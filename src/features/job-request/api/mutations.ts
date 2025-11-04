import { useBaseMutation } from "@/shared/api/use-base-mutation"
import { jobRequestKeys } from "@/features/job-request/api/keys"
import { jobRequestApi } from "@/features/job-request/api/api"

export const useCreateJobRequestMutation = () => {
   return useBaseMutation(jobRequestApi.create, {
      invalidateKeys: [jobRequestKeys.all],
   })
}

export const useApplyJobRequestMutation = () => {
   return useBaseMutation(jobRequestApi.apply, {
      invalidateKeys: id => [jobRequestKeys.detail(id), jobRequestKeys.all],
   })
}
