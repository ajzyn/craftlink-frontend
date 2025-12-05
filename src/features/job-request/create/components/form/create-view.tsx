import { HeroSection } from "@/features/job-request/create/components/form/hero-section"
import { CreationModal } from "@/features/job-request/create/components/form/creation-modal"
import { useJobRequestUI } from "@/features/job-request/create/hooks/use-job-request-ui"
import type { ServiceDetailsDto } from "@/entities/service"

interface CreateViewProps {
   selectedService?: ServiceDetailsDto
}

export const CreateView = ({ selectedService }: CreateViewProps) => {
   const { isStepperOpen, selectedCity, handleSelectCity, handleModalClose } = useJobRequestUI()

   if (!selectedService) {
      return null
   }

   return (
      <div>
         <HeroSection onSelectLocation={handleSelectCity} />

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
