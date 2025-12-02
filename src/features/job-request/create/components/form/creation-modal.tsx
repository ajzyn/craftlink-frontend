import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/shared/components/ui/dialog"
import { useJobRequestStepper } from "@/features/job-request/create/hooks/use-job-request-stepper"
import { useJobRequestSteps } from "@/features/job-request/create/hooks/use-job-request-steps"
import { CreationForm } from "@/features/job-request/create/components/form/creation-form"
import { NavigationStepper } from "@/features/job-request/create/components/form/navigation-stepper"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useState } from "react"
import { AuthGate } from "@/features/job-request/create/components/form/auth-gate"
import { useJobRequestForm } from "@/features/job-request/create/hooks/use-job-request-form"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import type { CityDto } from "@/entities/location"
import type { ServiceDetailsDto } from "@/entities/service"

interface ServiceRequestCreationModalProps {
   isOpen: boolean
   handleClose: VoidFunction
   selectedCity: CityDto
   service: ServiceDetailsDto
}

type CreationStage = "form" | "auth"

export const CreationModal = ({
   isOpen,
   handleClose,
   selectedCity,
   service,
}: ServiceRequestCreationModalProps) => {
   const isAuthenticated = useAuthStore(state => state.isAuthenticated)
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
               <CreationForm form={form}>{activeStep?.component}</CreationForm>
            )}

            {stage === "form" && (
               <DialogFooter className="px-6 mt-auto">
                  <NavigationStepper
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
