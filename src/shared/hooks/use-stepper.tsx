import { useMemo, useState } from "react"

export const useStepper = <T extends { id: number }>(steps: T[]) => {
   const [currentStep, setCurrentStep] = useState(0)

   const isFirstStep = currentStep === 0
   const isLastStep = currentStep === steps.length - 1

   const handleMoveBack = () => setCurrentStep(prev => prev - 1)
   const handleMoveForward = () => setCurrentStep(prev => prev + 1)

   const activeStep = useMemo(
      () => steps.find(step => step.id === currentStep) ?? null,
      [steps, currentStep],
   )

   return {
      currentStep,
      activeStep,
      isFirstStep,
      isLastStep,
      handleMoveBack,
      handleMoveForward,
      setCurrentStep,
   }
}
