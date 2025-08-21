import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
   createServiceRequestSchema,
   type ServiceRequestData,
} from "@/features/service-request/utils/service-request-form-schema"
import type { ServiceRequestStep } from "@/features/service-request/types/step-types"

export const useServiceRequestStepper = (
   hasDistricts: boolean,
   stepsConfig: ServiceRequestStep[],
) => {
   const [currentStep, setCurrentStep] = useState(0)

   const form = useForm<ServiceRequestData>({
      resolver: zodResolver(createServiceRequestSchema(hasDistricts)),
      mode: "onChange",
      defaultValues: {
         district: "",
         serviceTime: {
            type: undefined,
            exactDate: undefined,
         },
         description: {
            text: "",
            images: [],
         },
      },
   })

   const isFistStep = currentStep === 0
   const isLastStep = currentStep === stepsConfig.length - 1

   const handleMoveBack = () => {
      setCurrentStep(prev => prev - 1)
   }

   const handleMoveForward = async (e: React.MouseEvent) => {
      e.preventDefault()
      const step = stepsConfig.find(s => s.id === currentStep)
      if (!step) return

      if (step.validate) {
         const isValid = await form.trigger(step.validate)
         if (!isValid) return
      }

      setCurrentStep(prev => prev + 1)
   }

   const activeStep = useMemo(
      () => stepsConfig.find(step => step.id === currentStep) ?? null,
      [stepsConfig, currentStep],
   )

   return {
      form,
      handleMoveBack,
      handleMoveForward,
      activeStep,
      isFistStep,
      isLastStep,
   }
}
