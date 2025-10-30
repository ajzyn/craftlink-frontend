import { useBaseMutation } from "@/shared/api/use-base-mutation"
import { jobRequestKeys } from "@/features/job-request/shared/api/job-request-query-keys"
import { jobRequestApi } from "@/features/job-request/browse/api/api"

export const useApplyJobRequestMutation = () => {
   return useBaseMutation(jobRequestApi.apply, {
      invalidateKeys: id => [jobRequestKeys.detail(id), jobRequestKeys.all],
   })
}
