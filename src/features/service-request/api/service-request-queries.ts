import { useQuery } from "@tanstack/react-query"
import { serviceRequestApi } from "@/features/service-request/api/service-request-api"
import { serviceRequestQueryKeys } from "@/features/service-request/api/service-request-query-keys"

export const useAllServiceRequestsQuery = () => {
   return useQuery({
      queryKey: serviceRequestQueryKeys.all,
      queryFn: serviceRequestApi.getAllRequest,
   })
}
