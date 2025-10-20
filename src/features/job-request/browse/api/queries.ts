import { useQuery } from "@tanstack/react-query"
import { getJobRequestDetails } from "@/features/job-request/browse/api/api"
import { jobRequestKeys } from "@/features/job-request/shared/api/job-request-query-keys"

export const useGetJobRequestDetailsQuery = (id: string) => {
   return useQuery({
      queryKey: jobRequestKeys.detail(id),
      queryFn: () => getJobRequestDetails(id),
   })
}
