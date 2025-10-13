import { apiClient } from "@/shared/api/http-client"
import type { CityDto } from "@/shared/types/location-types"

export const locationApi = {
   getAllCities: async () => {
      const response = await apiClient.get<CityDto[]>("locations/cities")
      return response.data
   },
   getDistricts: async (city: string) => {
      const response = await apiClient.get<string[]>(`locations/${city}/districts`)
      return response.data
   },
}
