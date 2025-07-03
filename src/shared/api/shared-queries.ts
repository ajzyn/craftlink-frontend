import { useQuery } from "@tanstack/react-query"
import { sharedApi } from "@/shared/api/shared-api.ts"
import { locationsQueryKeys } from "@/shared/api/shared-query-keys.ts"

export const useCitiesQuery = () => {
   return useQuery({
      queryFn: sharedApi.getAllCities,
      queryKey: locationsQueryKeys.all,
   })
}

export const useCityDistrictsQuery = (cityName: string) => {
   return useQuery({
      queryFn: () => sharedApi.getDistricts(cityName),
      queryKey: locationsQueryKeys.detail(cityName),
   })
}
