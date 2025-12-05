import { Item } from "./item"
import { ItemSkeleton } from "./item-skeleton"
import type { CategoryServiceDto } from "@/entities/category"

interface ServiceListProps {
   services?: CategoryServiceDto[]
   isLoading: boolean
   categorySlug?: string
}

export const View = ({ services, isLoading, categorySlug }: ServiceListProps) => {
   if (isLoading || !services || !categorySlug) {
      return (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
               <ItemSkeleton key={i} />
            ))}
         </div>
      )
   }

   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {services?.map(service => (
            <Item key={service.id} service={service} categorySlug={categorySlug} />
         ))}
      </div>
   )
}
