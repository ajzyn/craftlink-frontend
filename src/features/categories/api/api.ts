import { apiClient } from "@/shared/api/http-client"
import type { CategoryDetailsDto } from "@/features/categories/api/types"

export const getCategoryDetailsRequest = async (slug: string) => {
   const response = await apiClient.get<CategoryDetailsDto>(`/categories/${slug}`)
   return response.data
}
