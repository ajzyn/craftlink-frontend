import { apiClient } from "@/shared/api/client.ts"
import type {
  ServiceCategoryDto,
  ServiceRequestDto,
} from "@/features/service-request/types/service-request.ts"

export const serviceRequestApi = {
  getAllRequests: async () => {
    const response = await apiClient.get<ServiceRequestDto[]>("/sec/service-requests")
    return response.data
  },
  getAllMyRequests: async () => {
    const response = await apiClient.get<ServiceRequestDto[]>("/sec/service-requests")
    return response.data
  },
  getAllCategoriesRequests: async () => {
    const response = await apiClient.get<ServiceCategoryDto[]>("/sec/service-requests")
    return response.data
  },
}
