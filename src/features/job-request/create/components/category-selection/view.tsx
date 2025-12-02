import type { CategoryBasicDto } from "@/entities/category"
import { Item } from "./item"
import { CategoryListSkeleton } from "@/features/dashboard/components/client/category-list-skeleton"

interface CategoryGridProps {
   categories?: CategoryBasicDto[]
   isLoading: boolean
}

export const View = ({ categories, isLoading }: CategoryGridProps) => {
   if (isLoading) {
      return (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
               <CategoryListSkeleton key={i} />
            ))}
         </div>
      )
   }

   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {categories?.map(category => <Item key={category.id} category={category} />)}
      </div>
   )
}
