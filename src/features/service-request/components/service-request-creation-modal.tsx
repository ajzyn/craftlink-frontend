import type { CityDto } from "@/shared/types/location-types"
import type { ServiceDetailsDto } from "@/features/services/types/service-types"
import { useMemo } from "react"
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog"
import { DistrictStep } from "@/features/service-request/components/steps/district/district-step"
import { Button } from "@/components/ui/button"
import { ServiceDateStep } from "@/features/service-request/components/steps/date/service-date-step"
import { Form } from "@/components/ui/form"
import { Bell, Clock, FileText, MapPin } from "lucide-react"
import type { ServiceRequestStep } from "@/features/service-request/types/step-types"
import { Description } from "@/features/service-request/components/steps/description/description"
import { Summary } from "@/features/service-request/components/steps/summary/summary"
import { useServiceRequestStepper } from "@/features/service-request/hooks/use-service-request-stepper"

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

   const { currentStep, form, handleMoveBack, handleMoveForward, onSubmit, renderStepContent } =
      useServiceRequestStepper(selectedCity.hasDistricts, stepsConfig)

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
