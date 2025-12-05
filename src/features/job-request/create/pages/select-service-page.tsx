import { useParams } from "@tanstack/react-router"
import { BackendErrorFallback } from "@/shared/components/backend-error-fallback"
import { Container } from "@/shared/components/container"
import { useCategoryDetailsQuery } from "@/entities/category"
import { JobRequestBanner } from "@/features/job-request/create/components/shared/job-request-banner"
import { View } from "@/features/job-request/create/components/service-selection/view"

const SelectServicePage = () => {
   const { categorySlug } = useParams({ from: "/zlecenia/nowe/$categorySlug" })

   const { data: category, isLoading, isError, refetch } = useCategoryDetailsQuery(categorySlug)

   if (isError) {
      return <BackendErrorFallback onRetry={refetch} isRetrying={isLoading} />
   }

   return (
      <>
         <JobRequestBanner
            title={category?.name}
            description={category?.description}
            iconName={category?.iconName}
            imageUrl={category?.imageKey}
            categoryName={category?.name}
            isLoading={isLoading}
         />

         <Container>
            <div className="mt-8">
               <h2 className="text-heading-2xl mb-4">
                  Dostępne usługi w kategorii {category?.name}
               </h2>
               <p className="text-body-lg text-muted-foreground mb-8">
                  Wybierz konkretną usługę, aby utworzyć zlecenie
               </p>

               <View
                  services={category?.services}
                  categorySlug={category?.slug}
                  isLoading={isLoading}
               />
            </div>
         </Container>
      </>
   )
}

export default SelectServicePage
