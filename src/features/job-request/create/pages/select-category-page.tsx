import { useAllCategoriesQuery } from "@/entities/category"
import { BackendErrorFallback } from "@/shared/components/backend-error-fallback"
import { Container } from "@/shared/components/container"
import { JobRequestBanner } from "../components/shared/job-request-banner"
import { View } from "@/features/job-request/create/components/category-selection/view"

const SelectCategoryPage = () => {
   const { data: categories, isLoading, isError, refetch } = useAllCategoriesQuery()

   if (isError) {
      return <BackendErrorFallback onRetry={refetch} isRetrying={isLoading} />
   }

   return (
      <>
         <JobRequestBanner
            title="Wybierz kategorię usługi"
            description="Znajdź odpowiednią kategorię dla Twojego zlecenia"
         />

         <Container>
            <View categories={categories} isLoading={isLoading} />
         </Container>
      </>
   )
}

export default SelectCategoryPage
