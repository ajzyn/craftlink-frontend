import { apiClient } from "@/shared/api/http-client"
import type {
   ApplyJobRequestResponse,
   JobRequestDetailsDto,
   JobRequestSummaryDto,
   MyJobRequestsParams,
} from "@/features/job-request/browse/types/data"
import type { SliceResponse } from "@/shared/types/data"

//TODO:
// aktualizuj cache danego elementu jezeli jest deleted albo completed

export const jobRequestApi = {
   getDetails: async (id: string) => {
      const response = await apiClient.get<JobRequestDetailsDto>(`/job-requests/${id}`)
      return response.data
   },
   apply: async (id: string) => {
      const response = await apiClient.post<ApplyJobRequestResponse>(
         `/sec/job-requests/${id}/apply`,
      )
      return response.data
   },
   getMy: async (params: MyJobRequestsParams) => {
      const response = await apiClient.get<SliceResponse<JobRequestSummaryDto>>(
         `/sec/job-requests/my`,
         { params },
      )
      return response.data
   },
   // getAll: async () => {
   //    const response = await apiClient.get<Slice<>>(`/sec/job-requests`)
   //    return response.data
   // },
}
