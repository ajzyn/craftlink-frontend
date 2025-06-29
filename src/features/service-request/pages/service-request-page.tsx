import { useParams } from "@tanstack/react-router"
import { useServiceDetailsQuery } from "@/features/services/api/service-queries.ts"
import { CategoryBanner } from "@/shared/components/category-banner.tsx"
import { ErrorState } from "@/shared/components/error-state.tsx"

const ServiceRequestPage = () => {
   const { serviceSlug } = useParams({ from: "/zamowienie-uslugi/$serviceSlug" })
   const { data: service, isLoading, isError, refetch } = useServiceDetailsQuery(serviceSlug)

   if (isError) {
      return <ErrorState onRetry={refetch} isRetrying={isLoading} />
   }

   return (
      <>
         <CategoryBanner
            name={service?.name}
            iconName={service?.category?.iconName}
            imageUrl={service?.category?.imageKey}
            isLoading={isLoading}
         />
      </>
   )
}

export default ServiceRequestPage
