import { MyJobRequests } from "@/features/job-request/browse/mine/components/my-job-requests"
import { LazyLoadingTrigger } from "@/components/lazy-loading-trigger"
import { ErrorFallback } from "@/components/error-fallback"
import { useMyJobRequests } from "@/features/job-request/browse/mine/hooks/use-my-job-request"

const MyJobRequestsPage = () => {
   const {
      status,
      allJobs,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      refetch,
      isError,
      loaderRef,
   } = useMyJobRequests()

   if (isError) {
      return <ErrorFallback onRetry={refetch} isRetrying={isLoading} />
   }

   return (
      <section>
         <MyJobRequests
            isFetchingNextPage={isFetchingNextPage}
            jobs={allJobs}
            selectedStatus={status}
            isLoading={isLoading}
         />
         <LazyLoadingTrigger
            isInitialLoading={isLoading}
            loaderRef={loaderRef}
            hasNextPage={hasNextPage}
         />
      </section>
   )
}
export default MyJobRequestsPage
