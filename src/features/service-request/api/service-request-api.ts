import { apiClient } from "@/shared/api/client"
import type { ServiceRequestDto } from "@/features/service-request/types/service-request-types"

export const serviceRequestApi = {
   getAllRequest: async () => {
      const response = await apiClient.get<ServiceRequestDto[]>("/sec/service-requests")
      return response.data
   },
   getAllMyRequest: async () => {
      const response = await apiClient.get<ServiceRequestDto[]>("/sec/service-requests")
      return response.data
   },
}
