import { MyJobsList } from "@/features/job-request/browse/mine/components/my-jobs-list"
import { LazyLoadingTrigger } from "@/shared/components/lazy-loading-trigger"
import { BackendErrorFallback } from "@/shared/components/backend-error-fallback"
import { useMyJobs } from "@/features/job-request/browse/mine/hooks/use-my-jobs"

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
   } = useMyJobs()

   if (isError) {
      return <BackendErrorFallback onRetry={refetch} isRetrying={isLoading} />
   }

   return (
      <section>
         <MyJobsList
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
