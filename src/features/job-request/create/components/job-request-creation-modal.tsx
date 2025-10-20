import type { CityDto } from "@/shared/types/location-types"
import type { ServiceDetailsDto } from "@/features/services/types/data"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { useJobRequestStepper } from "@/features/job-request/create/hooks/use-job-request-stepper"
import { useJobRequestSteps } from "@/features/job-request/create/hooks/use-job-request-steps"
import { JobRequestDetailsForm } from "@/features/job-request/create/components/job-request-details-form"
import { JobRequestNavigation } from "@/features/job-request/create/components/job-request-navigation"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface ServiceRequestCreationModalProps {
   isOpen: boolean
   handleClose: VoidFunction
   selectedCity: CityDto
   service: ServiceDetailsDto
}

export const JobRequestCreationModal = ({
   isOpen,
   handleClose,
   selectedCity,
   service,
}: ServiceRequestCreationModalProps) => {
   const stepsConfig = useJobRequestSteps(selectedCity, service)

   const { form, handleMoveBack, handleMoveForward, activeStep, isLastStep, isFirstStep } =
      useJobRequestStepper(selectedCity.hasDistricts, stepsConfig)

   const formId = "job-request-form"

   return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogContent className="max-w-[2000px] min-h-80 space-y-6">
            <DialogHeader>
               <DialogTitle className="text-xl font-semibold">{activeStep?.title}</DialogTitle>
            </DialogHeader>
            <VisuallyHidden>
               <DialogDescription></DialogDescription>
            </VisuallyHidden>

            <JobRequestDetailsForm
               form={form}
               formId={formId}
               selectedCity={selectedCity}
               service={service}
            >
               {activeStep?.component}
            </JobRequestDetailsForm>

            <DialogFooter className="px-6 mt-auto">
               <JobRequestNavigation
                  onBack={handleMoveBack}
                  isLast={isLastStep}
                  isFirst={isFirstStep}
                  onNext={handleMoveForward}
                  formId={formId}
               />
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
