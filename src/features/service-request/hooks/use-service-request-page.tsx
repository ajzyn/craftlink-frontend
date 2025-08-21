import { useState } from "react"
import { useServiceDetailsQuery } from "@/features/services/api/service-queries"
import { useCitiesQuery } from "@/shared/api/shared-queries"
import type { CityDto } from "@/shared/types/location-types"

export const useServiceRequestPage = (serviceSlug: string) => {
   const [isStepperOpen, setIsStepperOpen] = useState(false)
   const [selectedCity, setSelectedCity] = useState<CityDto | null>(null)

   const {
      data: service,
      isLoading: isLoadingService,
      isError: isErrorService,
      refetch: refetchService,
   } = useServiceDetailsQuery(serviceSlug)

   const {
      data: cities,
      isLoading: isLoadingCities,
      isError: isErrorCities,
      refetch: refetchCities,
   } = useCitiesQuery()

   const handleSelectLocation = (city: CityDto | null) => {
      if (city) {
         setSelectedCity(city)
         setIsStepperOpen(true)
      }
   }

   const handleModalClose = () => {
      setIsStepperOpen(false)
   }

   return {
      service,
      cities,
      selectedCity,
      isStepperOpen,
      isLoadingService,
      isLoadingCities,
      isErrorService,
      isErrorCities,
      handleSelectLocation,
      handleModalClose,
      refetchService,
      refetchCities,
   }
}
