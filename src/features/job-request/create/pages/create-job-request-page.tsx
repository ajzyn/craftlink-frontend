import { Navigate, useParams } from "@tanstack/react-router"
import { BackendErrorFallback } from "@/shared/components/backend-error-fallback"
import { useServiceDetailsQuery } from "@/entities/service/queries"
import { useCitiesQuery } from "@/entities/location/queries"
import { CreateView } from "@/features/job-request/create/components/create-view"

const CreateJobRequestPage = () => {
   const { serviceSlug } = useParams({ from: "/zlecenia/stworz/$serviceSlug" })
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
         <BackendErrorFallback
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
         cities={cities}
         isLoadingService={isLoadingService}
         isLoadingCities={isLoadingCities}
      />
   )
}

export default CreateJobRequestPage
