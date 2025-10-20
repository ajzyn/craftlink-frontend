import { apiClient } from "@/shared/api/http-client"
import type { CreateJobRequestRequestDto } from "@/features/job-request/create/types/data"
import type { CreationResponse } from "@/shared/types/data"

export const createJobRequest = async (requestDto: CreateJobRequestRequestDto) => {
   const response = await apiClient.post<CreationResponse>("/sec/job-requests", requestDto)
   return response.data
}
