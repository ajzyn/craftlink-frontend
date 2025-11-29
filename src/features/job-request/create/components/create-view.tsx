import { HeroSection } from "@/features/job-request/create/components/hero-section"
import { CreationModal } from "@/features/job-request/create/components/creation-modal"
import { useJobRequestUI } from "@/features/job-request/create/hooks/use-job-request-ui"
import type { CityDto } from "@/entities/location"
import type { ServiceDetailsDto } from "@/entities/service"

interface CreateViewProps {
   selectedService: ServiceDetailsDto
   cities?: CityDto[]
   isLoadingService: boolean
   isLoadingCities: boolean
}

export const CreateView = ({
   selectedService,
   cities,
   isLoadingService,
   isLoadingCities,
}: CreateViewProps) => {
   const { isStepperOpen, selectedCity, handleSelectCity, handleModalClose } = useJobRequestUI()

   return (
      <div>
         <HeroSection
            service={selectedService}
            cities={cities ?? []}
            isLoadingService={isLoadingService || isLoadingCities}
            handleSelectLocation={handleSelectCity}
         />

         {selectedCity && isStepperOpen && (
            <CreationModal
               isOpen={isStepperOpen}
               handleClose={handleModalClose}
               selectedCity={selectedCity}
               service={selectedService}
            />
         )}
      </div>
   )
}
