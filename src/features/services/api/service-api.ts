import { apiClient } from "@/shared/api/client.ts"
import type { ServiceBasicDto, ServiceDetailsDto } from "@/features/services/types/service-types.ts"

export const serviceApi = {
   getSearchServicesRequest: async (searchPhrase: string) => {
      const response = await apiClient.get<ServiceBasicDto[]>(
         `/services?searchPhrase=${searchPhrase}`,
      )
      return response.data
   },
   getServiceRequest: async (slug: string) => {
      const response = await apiClient.get<ServiceDetailsDto>(`/services/${slug}`)
      return response.data
   },
}
