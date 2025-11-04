import { useQuery } from "@tanstack/react-query"
import { serviceApi } from "@/features/services/api/api"
import { serviceKeys } from "@/features/services/api/keys"

export const useServiceDetailsQuery = (slug?: string) => {
   return useQuery({
      queryFn: () => serviceApi.getServiceRequest(slug!),
      queryKey: serviceKeys.detail(slug!),
      enabled: !!slug,
   })
}
