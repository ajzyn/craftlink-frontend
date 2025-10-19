import { useQuery } from "@tanstack/react-query"
import { jobRequestQueryKeys } from "@/features/job-request/shared/api/job-request-query-keys"
import { getJobRequestDetails } from "@/features/job-request/browse/api/api"

export const useGetJobRequestDetailsQuery = (id: string) => {
   return useQuery({
      queryKey: jobRequestQueryKeys.all,
      queryFn: () => getJobRequestDetails(id),
   })
}
