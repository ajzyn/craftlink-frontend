import { apiClient } from "@/shared/api/http-client"
import type {
   ApplyJobRequestDto,
   CreateJobRequestRequestDto,
   JobRequestDetailsDto,
   JobRequestSummaryDto,
   MyJobRequestsParamsDto,
} from "@/features/job-request/api/types"
import type { CreationDto, SliceDto } from "@/shared/api/types"

//TODO:
// aktualizuj cache danego elementu jezeli jest deleted albo completed

export const getJobRequestDetails = async (id: string) => {
   const response = await apiClient.get<JobRequestDetailsDto>(`/job-requests/${id}`)
   return response.data
}
export const applyJobRequest = async (id: string) => {
   const response = await apiClient.post<ApplyJobRequestDto>(`/sec/job-requests/${id}/apply`)
   return response.data
}
export const getMyJobRequests = async (params: MyJobRequestsParamsDto) => {
   const response = await apiClient.get<SliceDto<JobRequestSummaryDto>>(`/sec/job-requests/my`, {
      params,
   })
   return response.data
}
export const createJobRequest = async (requestDto: CreateJobRequestRequestDto) => {
   const response = await apiClient.post<CreationDto>("/sec/job-requests", requestDto)
   return response.data
}
