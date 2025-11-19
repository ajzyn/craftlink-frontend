import { useQuery } from "@tanstack/react-query"
import { serviceApi } from "@/entities/service/api"
import { serviceKeys } from "@/entities/service/query-keys"

export const useServiceDetailsQuery = (slug?: string) => {
   return useQuery({
      queryFn: () => serviceApi.getServiceRequest(slug!),
      queryKey: serviceKeys.detail(slug!),
      enabled: !!slug,
   })
}
