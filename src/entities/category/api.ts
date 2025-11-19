import { apiClient } from "@/shared/api/http-client"
import type { CategoryBasicDto } from "./types"

export const getAllCategoriesRequests = async () => {
   const response = await apiClient.get<CategoryBasicDto[]>("/categories")
   return response.data
}
