import { createJobRequest } from "@/features/job-request/create/api/api"
import { useBaseMutation } from "@/shared/api/use-base-mutation"
import { jobRequestKeys } from "@/features/job-request/shared/api/job-request-query-keys"

export const useCreateJobRequestMutation = () => {
   return useBaseMutation(createJobRequest, {
      invalidateKeys: [jobRequestKeys.all],
   })
}
