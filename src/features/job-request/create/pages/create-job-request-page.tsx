import { useParams } from "@tanstack/react-router"
import { BackendErrorFallback } from "@/shared/components/backend-error-fallback"
import { useServiceDetailsQuery } from "@/entities/service/queries"
import { useCitiesQuery } from "@/entities/location/queries"
import { CreateView } from "@/features/job-request/create/components/form/create-view"
import { JobRequestBanner } from "@/features/job-request/create/components/shared/job-request-banner"

const CreateJobRequestPage = () => {
   const { serviceSlug } = useParams({
      from: "/zlecenia/nowe/$categorySlug/$serviceSlug",
   })

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
      <>
         <JobRequestBanner
            title={service?.name}
            description="Wyszukaj lokalizacji dla wybranej usługi"
            iconName={service?.category.iconName}
            imageUrl={service?.category.imageKey}
            categoryName={service?.category.name}
            serviceName={service?.name}
            isLoading={isLoadingService}
         />

         <CreateView selectedService={service} cities={cities} />
      </>
   )
}

export default CreateJobRequestPage
