import { apiClient } from "@/shared/api/http-client"
import type {
   ApplyJobRequestDto,
   CreateJobRequestRequestDto,
   JobRequestDetailsDto,
   JobRequestSummaryDto,
   MyJobRequestsParamsDto,
} from "@/features/job-request/api/types"
import type { CreationResponseDto, SliceResponseDto } from "@/shared/types/data"

//TODO:
// aktualizuj cache danego elementu jezeli jest deleted albo completed

export const jobRequestApi = {
   getDetails: async (id: string) => {
      const response = await apiClient.get<JobRequestDetailsDto>(`/job-requests/${id}`)
      return response.data
   },
   apply: async (id: string) => {
      const response = await apiClient.post<ApplyJobRequestDto>(`/sec/job-requests/${id}/apply`)
      return response.data
   },
   getMy: async (params: MyJobRequestsParamsDto) => {
      const response = await apiClient.get<SliceResponseDto<JobRequestSummaryDto>>(
         `/sec/job-requests/my`,
         { params },
      )
      return response.data
   },
   create: async (requestDto: CreateJobRequestRequestDto) => {
      const response = await apiClient.post<CreationResponseDto>("/sec/job-requests", requestDto)
      return response.data
   },
}
