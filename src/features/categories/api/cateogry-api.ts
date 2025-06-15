import { apiClient } from "@/shared/api/client.ts"
import type { ServiceCategoryDto } from "@/features/categories/types/category.ts"

export const categoryApi = {
  getAllCategoriesRequests: async () => {
    const response = await apiClient.get<ServiceCategoryDto[]>("/categories")
    return response.data
  },
}
