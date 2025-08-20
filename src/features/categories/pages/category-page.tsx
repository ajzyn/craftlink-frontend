import { useParams, useRouter } from "@tanstack/react-router"
import { useCategoryDetailsQuery } from "@/features/categories/api/category-queries"
import { Button } from "@/components/ui/button"
import { ServiceItem } from "@/features/categories/components/service-item"
import { ServiceItemSkeleton } from "@/features/categories/components/skeletons/service-item-skeleton"
import { ErrorState } from "@/components/shared/error-state"
import { CategoryBanner } from "@/components/shared/category-banner"

const CategoryPage = () => {
   const router = useRouter()
   const { categorySlug } = useParams({ from: "/kategoria/$categorySlug" })
   const { data: category, isError, isLoading, refetch } = useCategoryDetailsQuery(categorySlug)

   const handleContactUs = () => {
      router.navigate({ to: "/kontakt" })
   }

   if (isError) {
      return <ErrorState onRetry={refetch} isRetrying={isLoading} />
   }

   return (
      <div className="min-h-screen">
         <CategoryBanner
            name={category?.name}
            iconName={category?.iconName}
            description={category?.description}
            imageUrl={category?.imageKey}
            isLoading={isLoading}
         />

         <div className="mt-24 section-content">
            <div className="space-y-8">
               <div className="space-y-3">
                  <p className="text-heading-2xl">Dostępne usługi w kategorii {category?.name}</p>
                  <p className="text-body-lg text-muted-foreground">
                     Wybierz konkretną usługę, aby znaleźć specjalistów w swojej okolicy
                  </p>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isLoading
                     ? Array.from({ length: 6 }).map((_el, index) => (
                          <ServiceItemSkeleton key={index} />
                       ))
                     : category?.services.map(service => (
                          <ServiceItem key={service.id} service={service} />
                       ))}
               </div>
            </div>
            <div className="mt-36 bg-accent space-y-4 flex flex-col items-center p-8 rounded-lg">
               <p className="text-heading-xl">Nie znalazłeś tego czego szukasz?</p>
               <p className="text-muted-foreground text-body-lg">
                  Skontaktuj się z nami, a pomożemy Ci znaleźć odpowiedniego specjalistę lub dodamy
                  nową usługę do naszej platformy.
               </p>
               <Button onClick={handleContactUs} className="mt-6 text-xl p-6 text-white">
                  Skontaktuj się z nami
               </Button>
            </div>
         </div>
      </div>
   )
}

export default CategoryPage
