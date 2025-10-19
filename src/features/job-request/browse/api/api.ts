import { apiClient } from "@/shared/api/http-client"
import type { JobRequestDetailsDto } from "@/features/job-request/shared/types/job-request-details"

export const getJobRequestDetails = async (id: string) => {
   const response = await apiClient.get<JobRequestDetailsDto>(`/sec/job-requests/${id}`)
   return response.data
}
