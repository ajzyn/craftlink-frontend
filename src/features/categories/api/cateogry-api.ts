import { apiClient } from "@/shared/api/client.ts"
import type {
   CategoryBasicDto,
   CategoryDetailsDto,
} from "@/features/categories/types/category-types.ts"

export const categoryApi = {
   getAllCategoriesRequests: async () => {
      const response = await apiClient.get<CategoryBasicDto[]>("/categories")
      return response.data
   },

   getCategoryDetailsRequest: async (slug: string) => {
      const response = await apiClient.get<CategoryDetailsDto>(`/categories/${slug}`)
      return response.data
   },
}
