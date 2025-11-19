import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { jobRequestKeys } from "@/features/job-request/api/keys"
import type { JobRequestStatus } from "@/features/job-request/shared/types/status-enum"
import { getJobRequestDetails, getMyJobRequests } from "@/features/job-request/api/api"

export const useGetJobRequestDetailsQuery = (id: string) => {
   return useQuery({
      queryKey: jobRequestKeys.detail(id),
      queryFn: () => getJobRequestDetails(id),
   })
}

export const useGetMyJobRequestQuery = (status?: JobRequestStatus) => {
   return useInfiniteQuery({
      queryKey: jobRequestKeys.mine(status),
      queryFn: ({ pageParam = 0 }) => getMyJobRequests({ status, pageNumber: pageParam }),
      getNextPageParam: (lastPage, pages) => {
         if (lastPage.hasNext) return pages.length
         return undefined
      },
      initialPageParam: 0,
      placeholderData: prev => prev,
   })
}
