import { BackendErrorFallback } from "@/shared/components/backend-error-fallback"
import { LazyLoadingTrigger } from "@/shared/components/lazy-loading-trigger"
import { useAllJobs } from "@/features/job-request/browse/all/hooks/use-all-jobs"
import { AllJobsList } from "@/features/job-request/browse/all/components/all-jobs-list"

const AllJobRequestPage = () => {
   const {
      params,
      allJobs,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      refetch,
      isError,
      loaderRef,
   } = useAllJobs()

   if (isError) {
      return <BackendErrorFallback onRetry={refetch} isRetrying={isLoading} />
   }

   return (
      <section>
         <AllJobsList
            isFetchingNextPage={isFetchingNextPage}
            jobs={allJobs}
            activeFilters={params}
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

export default AllJobRequestPage
