import { useQuery } from "@tanstack/react-query"
import { categoryApi } from "@/features/categories/api/cateogry-api.ts"
import { categoryRequestQueryKeys } from "@/features/categories/api/category-request-query-keys.ts"

export const useAllCategoriesQuery = () => {
  return useQuery({
    queryFn: categoryApi.getAllCategoriesRequests,
    queryKey: categoryRequestQueryKeys.all,
  })
}
