import type { CityDto } from "@/shared/types/location.ts"
import type { ServiceDetailsDto } from "@/features/services/types/service-types.ts"
import { useMemo, useState } from "react"
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog.tsx"
import { DistrictStep } from "./steps/district/district-step.tsx"
import { Button } from "@/components/ui/button.tsx"
import { ServiceDateStep } from "@/features/service-request/components/steps/date/service-date-step.tsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
   createServiceRequestSchema,
   type ServiceRequestData,
} from "@/features/service-request/types/service-request-form-schema.ts"
import { Form } from "@/components/ui/form.tsx"
import { Bell, Clock, FileText, MapPin } from "lucide-react"
import type { ServiceRequestStep } from "@/features/service-request/types/step.ts"
import { Description } from "@/features/service-request/components/steps/description/description.tsx"
import { Summary } from "@/features/service-request/components/steps/summary/summary.tsx"

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
   const [currentStep, setCurrentStep] = useState(selectedCity.hasDistricts ? 0 : 1)

   const form = useForm<ServiceRequestData>({
      resolver: zodResolver(createServiceRequestSchema(selectedCity.hasDistricts)),
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

   const stepsConfig: ServiceRequestStep[] = useMemo(
      () => [
         {
            id: 0,
            component: <DistrictStep cityName={selectedCity.name} />,
            validate: "district",
            title: "Wybierz dzielnice",
            icon: MapPin,
         },
         {
            id: 1,
            component: <ServiceDateStep />,
            validate: "serviceTime",
            title: "Termin usługi",
            icon: Clock,
         },
         {
            id: 2,
            component: <Description />,
            validate: "description",
            title: "Opisz usługę",
            icon: FileText,
         },
         {
            id: 3,
            component: <Summary service={service} city={selectedCity} />,
            title: "Podsumowanie",
            icon: Bell,
         },
      ],
      [selectedCity, service],
   )

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

   const renderStepContent = () => {
      return stepsConfig.find(step => step.id === currentStep)?.component ?? null
   }

   const onSubmit = (data: ServiceRequestData) => {
      console.log(data)
   }

   return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogContent className="max-w-[2000px] min-h-80 space-y-6">
            <DialogHeader>
               <DialogTitle className="text-xl font-semibold">
                  {stepsConfig.find(step => step.id === currentStep)?.title}
               </DialogTitle>
            </DialogHeader>

            <Form {...form}>
               <form id="service-request-form" onSubmit={form.handleSubmit(onSubmit)}>
                  {renderStepContent()}
               </form>
            </Form>

            <DialogFooter className="px-6 mt-auto">
               {currentStep !== 0 && (currentStep !== 1 || selectedCity.hasDistricts) && (
                  <Button onClick={handleMoveBack} className="cursor-pointer" variant="secondary">
                     Wstecz
                  </Button>
               )}
               {currentStep === stepsConfig.length - 1 ? (
                  <Button type="submit" form="service-request-form" className="cursor-pointer">
                     Dodaj ogłoszenie
                  </Button>
               ) : (
                  <Button onClick={handleMoveForward} className="cursor-pointer">
                     Dalej
                  </Button>
               )}
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
