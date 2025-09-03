import { apiClient } from "@/shared/api/client"
import type {
   CreateJobRequestRequestDto,
   ServiceRequestDto,
} from "@/features/service-request/types/service-request-types"

export const serviceRequestApi = {
   getAllRequest: async () => {
      const response = await apiClient.get<ServiceRequestDto[]>("/sec/service-requests")
      return response.data
   },
   getAllMyRequest: async () => {
      const response = await apiClient.get<ServiceRequestDto[]>("/sec/service-requests")
      return response.data
   },
   createJobRequest: async (requestDto: CreateJobRequestRequestDto) => {
      const response = await apiClient.post<ServiceRequestDto>("/service-requests", requestDto)
      return response.data
   },
}
