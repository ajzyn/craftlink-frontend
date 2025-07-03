import { apiClient } from "@/shared/api/client.ts"
import type { CityDto } from "@/shared/types/location.ts"

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
