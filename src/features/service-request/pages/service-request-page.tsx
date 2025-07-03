import { ServiceRequestHero } from "@/features/service-request/components/service-request-hero.tsx"
import { useParams } from "@tanstack/react-router"
import { useServiceDetailsQuery } from "@/features/services/api/service-queries.ts"
import { useCitiesQuery } from "@/shared/api/shared-queries.ts"
import type { CityDto } from "@/shared/types/location.ts"
import { ErrorState } from "@/shared/components/error-state.tsx"
import { useState } from "react"
import { ServiceRequestCreationModal } from "@/features/service-request/components/service-request-creation-modal.tsx"

const ServiceRequestPage = () => {
   const { serviceSlug } = useParams({ from: "/zamowienie-uslugi/$serviceSlug" })
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

   if (isErrorCities || isErrorService) {
      return (
         <ErrorState
            onRetry={() => {
               refetchService()
               refetchCities()
            }}
            isRetrying={isLoadingCities || isLoadingService}
         />
      )
   }

   const handleSelectLocation = (city: CityDto | null) => {
      if (city) {
         setSelectedCity(city)
         setIsStepperOpen(true)
      }
   }

   const handleModalClose = () => {
      setIsStepperOpen(false)
   }

   return (
      <div>
         <ServiceRequestHero
            service={service}
            cities={cities}
            isLoadingService={isLoadingService}
            handleSelectLocation={handleSelectLocation}
         />

         {service && selectedCity && isStepperOpen && (
            <ServiceRequestCreationModal
               isOpen={isStepperOpen}
               handleClose={handleModalClose}
               selectedCity={selectedCity}
               service={service}
            />
         )}
      </div>
   )
}

export default ServiceRequestPage
