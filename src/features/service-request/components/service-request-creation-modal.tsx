import type { CityDto } from "@/shared/types/location-types"
import type { ServiceDetailsDto } from "@/features/services/types/service-types"
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { useServiceRequestStepper } from "@/features/service-request/hooks/use-service-request-stepper"
import { useServiceRequestSteps } from "@/features/service-request/hooks/use-service-request-steps"
import { ServiceRequestDetailsForm } from "@/features/service-request/components/service-request-details-form"
import { ServiceRequestNavigation } from "@/features/service-request/components/service-request-navigation"

interface ServiceRequestCreationModalProps {
   isOpen: boolean
   handleClose: VoidFunction
   selectedCity: CityDto
   service: ServiceDetailsDto
}

export const ServiceRequestCreationModal = ({
   isOpen,
   handleClose,
   selectedCity,
   service,
}: ServiceRequestCreationModalProps) => {
   const stepsConfig = useServiceRequestSteps(selectedCity, service)

   const { form, handleMoveBack, handleMoveForward, activeStep, isLastStep, isFistStep } =
      useServiceRequestStepper(selectedCity.hasDistricts, stepsConfig)

   const formId = "service-request-form"

   return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogContent className="max-w-[2000px] min-h-80 space-y-6">
            <DialogHeader>
               <DialogTitle className="text-xl font-semibold">{activeStep?.title}</DialogTitle>
            </DialogHeader>

            <ServiceRequestDetailsForm
               form={form}
               formId={formId}
               selectedCity={selectedCity}
               service={service}
            >
               {activeStep?.component}
            </ServiceRequestDetailsForm>

            <DialogFooter className="px-6 mt-auto">
               <ServiceRequestNavigation
                  onBack={handleMoveBack}
                  isLast={isLastStep}
                  isFirst={isFistStep}
                  onNext={handleMoveForward}
                  formId={formId}
               />
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
