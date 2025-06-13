import { apiClient } from "@/shared/api/client.ts"
import type { ServiceRequestDto } from "@/features/service-request/types/service-request.ts"

export const serviceRequestApi = {
  getAllRequests: async () => {
    const response = await apiClient.get<ServiceRequestDto>("/sec/service-requests")
    return response.data
  },
}
