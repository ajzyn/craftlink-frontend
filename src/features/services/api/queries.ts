import { useQuery } from "@tanstack/react-query"
import { api } from "@/features/services/api/api"
import { serviceKeys } from "@/features/services/shared/api/service-request-query-keys"

export const useServiceDetailsQuery = (slug?: string) => {
   return useQuery({
      queryFn: () => api.getServiceRequest(slug!),
      queryKey: serviceKeys.detail(slug!),
      enabled: !!slug,
   })
}
