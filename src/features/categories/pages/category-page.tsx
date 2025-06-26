import { useParams, useRouter } from "@tanstack/react-router"
import { useCategoryDetailsQuery } from "@/features/categories/api/category-queries.ts"
import { Button } from "@/components/ui/button.tsx"
import { ArrowLeft } from "lucide-react"
import { DynamicIcon } from "@/shared/components/dynamic-icon.tsx"
import { ServiceItem } from "@/features/categories/components/service-item.tsx"
import { ServiceItemSkeleton } from "@/features/categories/components/skeletons/service-item-skeleton.tsx"
import { ErrorState } from "@/shared/components/error-state.tsx"

const CategoryPage = () => {
   const router = useRouter()
   const { categorySlug } = useParams({ from: "/kategoria/$categorySlug" })
   const { data: category, isError, isLoading, refetch } = useCategoryDetailsQuery(categorySlug)

   const handleGoBack = () => {
      router.navigate({ to: "/" })
   }

   const handleContactUs = () => {
      router.navigate({ to: "/kontakt" })
   }

   if (isError) {
      return <ErrorState onRetry={refetch} isRetrying={isLoading} />
   }

   return (
      <div className="min-h-screen">
         <div
            className="relative h-80 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${category?.imageKey})` }}
         >
            <div className="overlay"></div>
            <div className="relative z-10 h-full flex flex-col section-content">
               <div className="mt-6">
                  <Button
                     onClick={handleGoBack}
                     variant="ghost"
                     className="group text-white hover:bg-transparent hover:text-white hover:opacity-80"
                  >
                     <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                     Go back to dashboard
                  </Button>
               </div>
               <div className="mt-10 flex gap-3 items-center">
                  <span className="bg-white/30 rounded-lg p-3">
                     <DynamicIcon className="text-white h-8 w-8" iconName={category?.iconName} />
                  </span>
                  <div>
                     <p className="text-white text-display-xl">{category?.name}</p>
                     <p className="text-white text-body-xl">{category?.description}</p>
                  </div>
               </div>
            </div>
         </div>

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
                     ? Array.from({ length: 6 }).map((el, index) => (
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
