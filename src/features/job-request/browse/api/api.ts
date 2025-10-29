import { apiClient } from "@/shared/api/http-client"
import type {
   ApplyJobRequestResponse,
   JobRequestDetailsDto,
} from "@/features/job-request/browse/types/data"

//TODO:
// owarpuj to w jeden obiekt
// aktualizuj cache danego elementu jezeli jest deleted albo completed
export const getJobRequestDetails = async (id: string) => {
   const response = await apiClient.get<JobRequestDetailsDto>(`/job-requests/${id}`)
   return response.data
}

export const applyJobRequest = async (id: string) => {
   const response = await apiClient.post<ApplyJobRequestResponse>(`/sec/job-requests/${id}/apply`)
   return response.data
}

export const getAllJobRequests = async () => {
   const response = await apiClient.get<ApplyJobRequestResponse>(`/sec/job-requests`)
   return response.data
}
