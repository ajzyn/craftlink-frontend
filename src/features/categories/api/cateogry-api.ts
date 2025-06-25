import { apiClient } from "@/shared/api/client.ts"
import type { CategorySummaryDto } from "@/features/categories/types/category.ts"

export const categoryApi = {
  getAllCategoriesRequests: async () => {
    const response = await apiClient.get<CategorySummaryDto[]>("/categories")
    return response.data
  },
}
