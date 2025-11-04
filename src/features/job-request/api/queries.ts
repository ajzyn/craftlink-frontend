import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { jobRequestApi } from "@/features/job-request/api/api"
import { jobRequestKeys } from "@/features/job-request/api/keys"
import type { JobRequestStatus } from "@/features/job-request/shared/types/status-enum"

export const useGetJobRequestDetailsQuery = (id: string) => {
   return useQuery({
      queryKey: jobRequestKeys.detail(id),
      queryFn: () => jobRequestApi.getDetails(id),
   })
}

export const useGetMyJobRequestQuery = (status?: JobRequestStatus) => {
   return useInfiniteQuery({
      queryKey: jobRequestKeys.mine(status),
      queryFn: ({ pageParam = 0 }) => jobRequestApi.getMy({ status, pageNumber: pageParam }),
      getNextPageParam: (lastPage, pages) => {
         if (lastPage.hasNext) return pages.length
         return undefined
      },
      initialPageParam: 0,
      placeholderData: prev => prev,
   })
}
