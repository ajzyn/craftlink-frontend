import { ServiceRequestHero } from "@/features/service-request/components/service-request-hero"
import { useParams } from "@tanstack/react-router"
import { ServiceRequestCreationModal } from "@/features/service-request/components/service-request-creation-modal"
import { ErrorState } from "@/components/shared/error-state"
import { useServiceRequestPage } from "@/features/service-request/hooks/use-service-request-page"

const ServiceRequestPage = () => {
   const { serviceSlug } = useParams({ from: "/zamowienie-uslugi/$serviceSlug" })
   const {
      service,
      cities,
      selectedCity,
      isStepperOpen,
      isLoadingService,
      isLoadingCities,
      isErrorService,
      isErrorCities,
      handleSelectLocation,
      handleModalClose,
      refetchService,
      refetchCities,
   } = useServiceRequestPage(serviceSlug)

   if (isErrorCities || isErrorService) {
      return (
         <ErrorState
            onRetry={() => {
               refetchService()
               refetchCities()
            }}
            isRetrying={isLoadingCities || isLoadingService}
         />
      )
   }

   return (
      <div>
         <ServiceRequestHero
            service={service}
            cities={cities}
            isLoadingService={isLoadingService}
            handleSelectLocation={handleSelectLocation}
         />

         {service && selectedCity && isStepperOpen && (
            <ServiceRequestCreationModal
               isOpen={isStepperOpen}
               handleClose={handleModalClose}
               selectedCity={selectedCity}
               service={service}
            />
         )}
      </div>
   )
}

export default ServiceRequestPage
