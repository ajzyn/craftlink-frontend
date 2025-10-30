import { useGetMyJobRequestQuery } from "@/features/job-request/browse/api/queries"
import { useLazyLoader } from "@/shared/hooks/use-lazy-loader"
import { useSearch } from "@tanstack/react-router"
import { useMemo } from "react"
import type { JobRequestStatus } from "@/features/job-request/shared/types/job-request-status-enum"

export const useMyJobRequests = () => {
   const { status } = useSearch({
      from: "/zlecenia/moje",
   }) as { status?: JobRequestStatus }

   const query = useGetMyJobRequestQuery(status)
   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch, isError } =
      query

   const allJobs = useMemo(() => data?.pages.flatMap(page => page.content) ?? [], [data?.pages])
   const isFirstPage = data?.pages?.[0]?.first ?? true

   const { loaderRef } = useLazyLoader({
      hasNextPage,
      fetchNextPage,
      isFirstPage,
      isFetchingNextPage,
   })

   return {
      status,
      allJobs,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      refetch,
      isError,
      loaderRef,
   }
}
