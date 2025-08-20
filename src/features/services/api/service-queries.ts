import { useQuery } from "@tanstack/react-query"
import { serviceApi } from "@/features/services/api/service-api"
import { serviceRequestQueryKeys } from "@/features/service-request/api/service-request-query-keys"

export const useServiceDetailsQuery = (slug?: string) => {
   return useQuery({
      queryFn: () => serviceApi.getServiceRequest(slug!),
      queryKey: serviceRequestQueryKeys.detail(slug!),
      enabled: !!slug,
   })
}
