import { useAllMyJobRequestQuery } from "@/features/job-request/api/queries"
import { useLazyLoader } from "@/shared/hooks"
import { useSearch } from "@tanstack/react-router"
import { useMemo } from "react"
import type { AllJobRequestSearchParams } from "@/features/job-request/browse/all/types/query"

export const useAllJobs = () => {
   const params = useSearch({
      from: "/zlecenia",
   }) as AllJobRequestSearchParams

   const query = useAllMyJobRequestQuery(params)
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
      params,
      allJobs,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      refetch,
      isError,
      loaderRef,
   }
}
