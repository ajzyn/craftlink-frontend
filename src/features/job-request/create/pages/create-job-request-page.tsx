import { Navigate, useParams } from "@tanstack/react-router"
import { ErrorFallback } from "@/components/error-fallback"
import { useServiceDetailsQuery } from "@/features/services/api/queries"
import { useCitiesQuery } from "@/features/location/api/queries"
import { CreateView } from "@/features/job-request/create/components/create-view"

const CreateJobRequestPage = () => {
   const { serviceSlug } = useParams({ from: "/zamowienie-uslugi/$serviceSlug" })
   const {
      data: service,
      isLoading: isLoadingService,
      isError: isErrorFetchingService,
      refetch: refetchService,
   } = useServiceDetailsQuery(serviceSlug)

   const {
      data: cities,
      isLoading: isLoadingCities,
      isError: isErrorFetchingCities,
      refetch: refetchCities,
   } = useCitiesQuery()

   if (!service) {
      return <Navigate to="/" />
   }

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
      <CreateView
         selectedService={service}
         rawCities={cities}
         isLoadingService={isLoadingService}
         isLoadingCities={isLoadingCities}
      />
   )
}

export default CreateJobRequestPage
