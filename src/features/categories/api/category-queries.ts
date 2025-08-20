import { useQuery } from "@tanstack/react-query"
import { categoryApi } from "@/features/categories/api/cateogry-api"
import { categoryRequestQueryKeys } from "@/features/categories/api/category-request-query-keys"

export const useAllCategoriesQuery = () => {
   return useQuery({
      queryFn: categoryApi.getAllCategoriesRequests,
      queryKey: categoryRequestQueryKeys.all,
   })
}

export const useCategoryDetailsQuery = (slug?: string) => {
   return useQuery({
      queryFn: () => categoryApi.getCategoryDetailsRequest(slug!),
      queryKey: categoryRequestQueryKeys.detail(slug!),
      enabled: !!slug,
   })
}
