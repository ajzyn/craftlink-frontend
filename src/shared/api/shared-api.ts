import { apiClient } from "@/shared/api/client"
import type { CityDto } from "@/shared/types/location"

export const sharedApi = {
   getAllCities: async () => {
      const response = await apiClient.get<CityDto[]>("locations/cities")
      return response.data
   },
   getDistricts: async (city: string) => {
      const response = await apiClient.get<string[]>(`locations/${city}/districts`)
      return response.data
   },
}
