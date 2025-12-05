import { apiClient } from "@/shared/api/http-client"
import type { CategoryBasicDto, CategoryDetailsDto } from "./types"

export const getAllCategoriesRequests = async () => {
   const response = await apiClient.get<CategoryBasicDto[]>("/categories")
   return response.data
}

export const getCategoryDetailsRequest = async (slug: string) => {
   const response = await apiClient.get<CategoryDetailsDto>(`/categories/${slug}`)
   return response.data
}
