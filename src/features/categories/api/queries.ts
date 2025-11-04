import { useQuery } from "@tanstack/react-query"
import { getCategoryDetailsRequest } from "@/features/categories/api/api"
import { categoryKeys } from "@/entities/category"

export const useCategoryDetailsQuery = (slug?: string) => {
   return useQuery({
      queryFn: () => getCategoryDetailsRequest(slug!),
      queryKey: categoryKeys.detail(slug!),
      enabled: !!slug,
   })
}
