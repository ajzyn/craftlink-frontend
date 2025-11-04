import { useParams } from "@tanstack/react-router"
import { useGetJobRequestDetailsQuery } from "@/features/job-request/api/queries"
import { DetailsView } from "@/features/job-request/details/components/details-view"
import { BackendErrorFallback } from "@/shared/components/backend-error-fallback"

const JobRequestDetailsPage = () => {
   const { id } = useParams({ from: "/zlecenia/$id" })
   const { data, isLoading, refetch } = useGetJobRequestDetailsQuery(id)

   if (isLoading) {
      return "is loading" //TODO: skeleton - pass isLoading to view
   }

   if (data) {
      return <DetailsView job={data} />
   }

   return <BackendErrorFallback onRetry={refetch} isRetrying={isLoading} />
}

export default JobRequestDetailsPage
