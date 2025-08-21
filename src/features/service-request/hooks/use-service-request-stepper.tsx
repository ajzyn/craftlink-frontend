import { useState } from "react"
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
   const [currentStep, setCurrentStep] = useState(hasDistricts ? 0 : 1)

   const form = useForm<ServiceRequestData>({
      resolver: zodResolver(createServiceRequestSchema(hasDistricts)),
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

   const handleMoveBack = () => {
      setCurrentStep(prev => prev - 1)
   }

   const handleMoveForward = async () => {
      const step = stepsConfig.find(s => s.id === currentStep)
      if (!step) return

      if (step.validate) {
         const isValid = await form.trigger(step.validate)
         if (!isValid) return
      }

      setCurrentStep(prev => prev + 1)
   }

   const onSubmit = (data: ServiceRequestData) => {
      console.log(data)
      // Here you would typically call an API to submit the form
   }

   const renderStepContent = () => {
      return stepsConfig.find(step => step.id === currentStep)?.component ?? null
   }

   return {
      currentStep,
      form,
      handleMoveBack,
      handleMoveForward,
      onSubmit,
      renderStepContent,
   }
}
