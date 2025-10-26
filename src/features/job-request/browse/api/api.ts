import { apiClient } from "@/shared/api/http-client"
import type {
   ApplyJobRequestResponse,
   JobRequestDetailsDto,
} from "@/features/job-request/browse/types/data"

export const getJobRequestDetails = async (id: string) => {
   const response = await apiClient.get<JobRequestDetailsDto>(`/sec/job-requests/${id}`)
   return response.data
}

export const applyJobRequest = async (id: string) => {
   const response = await apiClient.post<ApplyJobRequestResponse>(`/sec/job-requests/${id}/apply`)
   return response.data
}
