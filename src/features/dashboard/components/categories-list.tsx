import { Skeleton } from "@/components/ui/skeleton"
import { useAllCategoriesQuery } from "@/features/categories/api/queries"
import { useRouter } from "@tanstack/react-router"
import { ErrorState } from "@/components/error-state"
import { DynamicIcon } from "@/components/dynamic-icon"

export const CategoriesList = () => {
   const router = useRouter()
   const { data: categories, isError, isLoading, refetch } = useAllCategoriesQuery()

   const handleCategoryClick = (categorySlug: string) => {
      router.navigate({ to: `/kategoria/${categorySlug}` })
   }

   if (isError) {
      return <ErrorState onRetry={refetch} isRetrying={isLoading} />
   }

   if (isLoading) {
      return (
         <div className="mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
               {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3">
                     <Skeleton className="h-[53px] w-72" />
                  </div>
               ))}
            </div>
         </div>
      )
   }

   return (
      <div className="mt-12">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {categories?.map(category => (
               <button
                  onClick={() => handleCategoryClick(category.slug)}
                  key={category.id}
                  className="flex items-center space-x-4 p-3 cursor-pointer text-left group transition-colors duration-200 hover:bg-[--color-muted]"
               >
                  <div className="flex-shrink-0">
                     <DynamicIcon
                        iconName={category.iconName}
                        className="w-6 h-6 text-primary group-hover:text-primary-hover transition-colors duration-200"
                     />
                  </div>
                  <span className="text-primary text-body-lg  hover:text-primary-hover transition-colors duration-200">
                     {category.name}
                  </span>
               </button>
            ))}
         </div>
      </div>
   )
}
