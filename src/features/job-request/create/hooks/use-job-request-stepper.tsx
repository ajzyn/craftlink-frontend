import type { JobRequestStep } from "@/features/job-request/create/types/stepper"
import { useStepper } from "@/shared/hooks/use-stepper"
import { useJobRequestForm } from "./use-job-request-form"

export const useJobRequestStepper = (hasDistricts: boolean, steps: JobRequestStep[]) => {
   const stepper = useStepper(steps)
   const form = useJobRequestForm(hasDistricts)

   const handleMoveForward = async (e: React.MouseEvent) => {
      e.preventDefault()
      const step = stepper.activeStep
      if (!step) return

      if (step.validate) {
         const isValid = await form.trigger(step.validate)
         if (!isValid) return
      }

      stepper.handleMoveForward()
   }

   return {
      form,
      ...stepper,
      handleMoveForward,
   }
}
