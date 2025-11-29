import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { jobRequestKeys } from "@/features/job-request/api/keys"
import type { JobRequestStatus } from "@/features/job-request/shared/types/status-enum"
import {
   getAllJobRequests,
   getJobRequestDetails,
   getMyJobRequests,
} from "@/features/job-request/api/api"
import type { AllJobRequestSearchParams } from "@/features/job-request/browse/all/types/query"

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

export const useAllMyJobRequestQuery = (args: AllJobRequestSearchParams) => {
   return useInfiniteQuery({
      queryKey: [jobRequestKeys.all, jobRequestKeys.filters(args)], //TODO: verify
      queryFn: ({ pageParam = 0 }) => getAllJobRequests({ ...args, pageNumber: pageParam }),
      getNextPageParam: (lastPage, pages) => {
         if (lastPage.hasNext) return pages.length
         return undefined
      },
      initialPageParam: 0,
      placeholderData: prev => prev,
   })
}
