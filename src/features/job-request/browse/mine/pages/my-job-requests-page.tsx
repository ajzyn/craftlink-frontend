import { MyJobRequests } from "@/features/job-request/browse/mine/components/my-job-requests"
import { LazyLoadingTrigger } from "@/shared/components/lazy-loading-trigger"
import { BackendErrorFallback } from "@/shared/components/backend-error-fallback"
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
      return <BackendErrorFallback onRetry={refetch} isRetrying={isLoading} />
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
