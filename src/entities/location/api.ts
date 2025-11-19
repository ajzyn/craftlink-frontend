import { apiClient } from "@/shared/api/http-client"
import type { CityDto } from "./types"

export const getAllCities = async () => {
   const response = await apiClient.get<CityDto[]>("locations/cities")
   return response.data
}

export const getDistricts = async (city: string) => {
   const response = await apiClient.get<string[]>(`locations/${city}/districts`)
   return response.data
}
