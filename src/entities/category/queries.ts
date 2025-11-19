import { useQuery } from "@tanstack/react-query"
import { categoryKeys } from "@/entities/category/query-keys"
import { getAllCategoriesRequests } from "@/entities/category/api"

export const useAllCategoriesQuery = () => {
   return useQuery({
      queryFn: getAllCategoriesRequests,
      queryKey: categoryKeys.all,
   })
}
