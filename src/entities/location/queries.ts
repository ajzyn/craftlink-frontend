import { useQuery } from "@tanstack/react-query"
import { locationKeys } from "@/entities/location/query-keys"
import { getAllCities, getDistricts } from "@/entities/location/api"

export const useCitiesQuery = () => {
   return useQuery({
      queryFn: getAllCities,
      queryKey: locationKeys.all,
   })
}

export const useCityDistrictsQuery = (cityName: string) => {
   return useQuery({
      queryFn: () => getDistricts(cityName),
      queryKey: locationKeys.detail(cityName),
   })
}
