import { useParams } from "@tanstack/react-router"
import { useGetJobRequestDetailsQuery } from "@/features/job-request/browse/api/queries"
import { JobRequestDetails } from "@/features/job-request/browse/components/details"
import { ErrorState } from "@/components/error-state"

const JobRequestDetailsPage = () => {
   const { id } = useParams({ from: "/zlecenia/$id" })
   const { data, isLoading, refetch } = useGetJobRequestDetailsQuery(id)

   if (isLoading) {
      return "is loading" //TODO: skeleton
   }

   if (data) {
      return <JobRequestDetails job={data} />
   }

   return <ErrorState onRetry={refetch} isRetrying={isLoading} />
}

export default JobRequestDetailsPage
