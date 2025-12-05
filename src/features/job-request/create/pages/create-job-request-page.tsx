import { useParams } from "@tanstack/react-router"
import { BackendErrorFallback } from "@/shared/components/backend-error-fallback"
import { useServiceDetailsQuery } from "@/entities/service/queries"
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

   if (isErrorFetchingService) {
      return (
         <BackendErrorFallback
            onRetry={() => {
               refetchService()
            }}
            isRetrying={isLoadingService}
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

         <CreateView selectedService={service} />
      </>
   )
}

export default CreateJobRequestPage
