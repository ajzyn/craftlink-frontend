import { useQuery } from "@tanstack/react-query"
import { locationsQueryKeys } from "@/shared/api/shared-query-keys"
import { locationApi } from "@/features/location/api/location-api"

export const useCitiesQuery = () => {
   return useQuery({
      queryFn: locationApi.getAllCities,
      queryKey: locationsQueryKeys.all,
   })
}

export const useCityDistrictsQuery = (cityName: string) => {
   return useQuery({
      queryFn: () => locationApi.getDistricts(cityName),
      queryKey: locationsQueryKeys.detail(cityName),
   })
}
