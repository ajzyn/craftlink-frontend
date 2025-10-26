import { useQuery } from "@tanstack/react-query"
import { categoryApi } from "@/features/categories/api/api"
import { categoryKeys } from "@/features/categories/shared/api/category-request-query-keys"

export const useAllCategoriesQuery = () => {
   return useQuery({
      queryFn: categoryApi.getAllCategoriesRequests,
      queryKey: categoryKeys.all,
   })
}

export const useCategoryDetailsQuery = (slug?: string) => {
   return useQuery({
      queryFn: () => categoryApi.getCategoryDetailsRequest(slug!),
      queryKey: categoryKeys.detail(slug!),
      enabled: !!slug,
   })
}
