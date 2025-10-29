import { JobRequestHero } from "@/features/job-request/create/components/job-request-hero"
import { useParams } from "@tanstack/react-router"
import { JobRequestCreationModal } from "@/features/job-request/create/components/job-request-creation-modal"
import { ErrorFallback } from "@/components/error-fallback"
import { useJobRequestUI } from "../hooks/use-job-request-ui"
import { useServiceDetailsQuery } from "@/features/services/api/queries"
import { useCitiesQuery } from "@/features/location/api/location-queries"
import { useMemo } from "react"
import { capitalizeFirstLetter } from "@/shared/utils/string-utils"

const JobRequestPage = () => {
   const { serviceSlug } = useParams({ from: "/zamowienie-uslugi/$serviceSlug" })
   const {
      data: service,
      isLoading: isLoadingService,
      isError: isErrorFetchingService,
      refetch: refetchService,
   } = useServiceDetailsQuery(serviceSlug)

   const {
      data: rawCities,
      isLoading: isLoadingCities,
      isError: isErrorFetchingCities,
      refetch: refetchCities,
   } = useCitiesQuery()
   const { isStepperOpen, selectedCity, handleSelectCity, handleModalClose } = useJobRequestUI()

   const cities = useMemo(() => {
      if (!rawCities) {
         return []
      }
      return rawCities.map(city => ({ ...city, name: capitalizeFirstLetter(city.name) }))
   }, [rawCities])

   if (isErrorFetchingCities || isErrorFetchingService) {
      return (
         <ErrorFallback
            onRetry={() => {
               refetchService()
               refetchCities()
            }}
            isRetrying={isLoadingCities || isLoadingService}
         />
      )
   }

   return (
      <div>
         <JobRequestHero
            service={service}
            cities={cities}
            isLoadingService={isLoadingService}
            handleSelectLocation={handleSelectCity}
         />

         {service && selectedCity && isStepperOpen && (
            <JobRequestCreationModal
               isOpen={isStepperOpen}
               handleClose={handleModalClose}
               selectedCity={selectedCity}
               service={service}
            />
         )}
      </div>
   )
}

export default JobRequestPage
