import { useBaseMutation } from "@/shared/api/use-base-mutation"
import { jobRequestKeys } from "@/features/job-request/api/keys"
import { applyJobRequest, createJobRequest } from "@/features/job-request/api/api"

export const useCreateJobRequestMutation = () => {
   return useBaseMutation(createJobRequest, {
      invalidateKeys: [jobRequestKeys.all],
   })
}

export const useApplyJobRequestMutation = () => {
   return useBaseMutation(applyJobRequest, {
      invalidateKeys: id => [jobRequestKeys.detail(id), jobRequestKeys.all],
   })
}
