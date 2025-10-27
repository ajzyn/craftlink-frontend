import type { JobRequestStep } from "@/features/job-request/create/types/stepper"
import { useStepper } from "@/shared/hooks/use-stepper"
import type { UseFormTrigger } from "react-hook-form"
import type { JobRequestData } from "@/features/job-request/create/utils/form-schema"

export const useJobRequestStepper = (
   steps: JobRequestStep[],
   validateStep: UseFormTrigger<JobRequestData>,
) => {
   const stepper = useStepper(steps)

   const handleMoveForward = async (e: React.MouseEvent) => {
      e.preventDefault()
      const step = stepper.activeStep
      if (!step) return

      if (step.name) {
         const isValid = await validateStep(step.name)
         if (!isValid) return
      }

      stepper.handleMoveForward()
   }

   return {
      ...stepper,
      handleMoveForward,
   }
}
