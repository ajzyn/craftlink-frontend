import { apiClient } from "@/shared/api/client.ts"
import type {
  CategoryDetailsDto,
  CategorySummaryDto,
} from "@/features/categories/types/category-types.ts"

export const categoryApi = {
  getAllCategoriesRequests: async () => {
    const response = await apiClient.get<CategorySummaryDto[]>("/categories")
    return response.data
  },

  getCategoryRequest: async (slug: string) => {
    const response = await apiClient.get<CategoryDetailsDto>(`/categories/${slug}`)
    return response.data
  },
}
