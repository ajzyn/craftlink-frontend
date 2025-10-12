import { apiClient } from "@/shared/api/httpClient"
import type {
   CategoryBasicDto,
   CategoryDetailsDto,
} from "@/features/categories/types/category-types"

export const categoryApi = {
   getAllCategoriesRequests: async () => {
      const response = await apiClient.get<CategoryBasicDto[]>("/sec/categories")
      return response.data
   },

   getCategoryDetailsRequest: async (slug: string) => {
      const response = await apiClient.get<CategoryDetailsDto>(`/sec/categories/${slug}`)
      return response.data
   },
}
