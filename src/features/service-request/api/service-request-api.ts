import { apiClient } from "@/shared/api/httpClient"
import type {
   CreateJobRequestRequestDto,
   ServiceRequestDto,
} from "@/features/service-request/types/service-request-types"

export const serviceRequestApi = {
   getAllRequest: async () => {
      const response = await apiClient.get<ServiceRequestDto[]>("/sec/job-requests")
      return response.data
   },
   getAllMyRequest: async () => {
      const response = await apiClient.get<ServiceRequestDto[]>("/sec/job-requests")
      return response.data
   },
   createJobRequest: async (requestDto: CreateJobRequestRequestDto) => {
      const response = await apiClient.post<ServiceRequestDto>("/sec/job-requests", requestDto)
      return response.data
   },
}
