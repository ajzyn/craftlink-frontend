import { useQuery } from "@tanstack/react-query"
import { categoryKeys } from "@/entities/category/query-keys"
import { getAllCategoriesRequests, getCategoryDetailsRequest } from "@/entities/category/api"

export const useAllCategoriesQuery = () => {
   return useQuery({
      queryFn: getAllCategoriesRequests,
      queryKey: categoryKeys.all,
   })
}

export const useCategoryDetailsQuery = (slug?: string) => {
   return useQuery({
      queryFn: () => getCategoryDetailsRequest(slug!),
      queryKey: categoryKeys.detail(slug!),
      enabled: !!slug,
   })
}
