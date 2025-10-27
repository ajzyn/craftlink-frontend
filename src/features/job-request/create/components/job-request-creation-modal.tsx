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
import { useState } from "react"
import { AuthGate } from "@/features/job-request/create/components/auth/auth-gate"
import { useJobRequestForm } from "@/features/job-request/create/hooks/use-job-request-form"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"

interface ServiceRequestCreationModalProps {
   isOpen: boolean
   handleClose: VoidFunction
   selectedCity: CityDto
   service: ServiceDetailsDto
}

type CreationStage = "form" | "auth"

export const JobRequestCreationModal = ({
   isOpen,
   handleClose,
   selectedCity,
   service,
}: ServiceRequestCreationModalProps) => {
   const { isAuthenticated } = useAuthStore()
   const [stage, setStage] = useState<CreationStage>("form")

   const stepsConfig = useJobRequestSteps(selectedCity, service)
   const { submitJobRequestForm, isCreatingJobRequest, ...form } = useJobRequestForm(
      selectedCity,
      service,
   )
   const { handleMoveBack, handleMoveForward, activeStep, isLastStep, isFirstStep } =
      useJobRequestStepper(stepsConfig, form.trigger)

   const handleRequestSubmitStart = () => {
      if (isAuthenticated) {
         submitJobRequestForm()
         return
      }
      setStage("auth")
   }

   const handleAuthSuccess = () => {
      setStage("form")
      submitJobRequestForm()
   }

   return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogContent className="max-w-[2000px] min-h-80 space-y-6">
            <DialogHeader>
               <DialogTitle className="text-xl font-semibold">
                  {stage === "auth"
                     ? "Załóż konto lub zaloguj się, aby wysłać zlecenie"
                     : activeStep?.title}
               </DialogTitle>
            </DialogHeader>
            <VisuallyHidden>
               <DialogDescription></DialogDescription>
            </VisuallyHidden>

            {stage === "auth" ? (
               <AuthGate onSuccessAuth={handleAuthSuccess} />
            ) : (
               <JobRequestDetailsForm form={form}>{activeStep?.component}</JobRequestDetailsForm>
            )}

            {stage === "form" && (
               <DialogFooter className="px-6 mt-auto">
                  <JobRequestNavigation
                     onBack={handleMoveBack}
                     isLast={isLastStep}
                     isFirst={isFirstStep}
                     onNext={handleMoveForward}
                     onRequestSubmitStart={handleRequestSubmitStart}
                     isCreatingJobRequest={isCreatingJobRequest}
                  />
               </DialogFooter>
            )}
         </DialogContent>
      </Dialog>
   )
}
