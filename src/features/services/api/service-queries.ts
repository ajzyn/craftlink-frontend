import { useQuery } from "@tanstack/react-query"
import { serviceApi } from "@/features/services/api/service-api"
import { jobRequestQueryKeys } from "@/features/job-request/api/job-request-query-keys"

export const useServiceDetailsQuery = (slug?: string) => {
   return useQuery({
      queryFn: () => serviceApi.getServiceRequest(slug!),
      queryKey: jobRequestQueryKeys.detail(slug!),
      enabled: !!slug,
   })
}
