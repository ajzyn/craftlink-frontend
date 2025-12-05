import { apiClient } from "@/shared/api/http-client"
import type { ServiceDetailsDto, ServiceSearchResultDto } from "./types"

export const searchServiceByText = async (searchPhrase: string) => {
   const response = await apiClient.get<ServiceSearchResultDto[]>(
      `/services?searchPhrase=${searchPhrase}`,
   )
   return response.data
}

export const getServiceBySlug = async (slug: string) => {
   const response = await apiClient.get<ServiceDetailsDto>(`/services/${slug}`)
   return response.data
}
