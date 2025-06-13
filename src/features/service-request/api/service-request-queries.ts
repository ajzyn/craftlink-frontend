import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/shared/api/query-keys.ts"
import { serviceRequestApi } from "@/features/service-request/api/service-request-api.ts"

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: queryKeys.serviceRequest.all,
    queryFn: serviceRequestApi.getAllRequests,
    staleTime: 5 * 60 * 1000,
  })
}
