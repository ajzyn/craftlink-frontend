import type { CityDto } from "@/shared/types/location.ts"
import type { ServiceDetailsDto } from "@/features/services/types/service-types.ts"
import { useState } from "react"
import type { ServiceRequestData } from "@/features/service-request/types/step.ts"
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog.tsx"
import { DistrictStep } from "./steps/district-step"
import { steps } from "@/features/service-request/consts/steps.ts"

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
   const [serviceRequestData, setServiceRequestData] = useState<ServiceRequestData>({
      district: "",
      serviceTime: { type: "asap" },
      description: { text: "", images: [] },
      email: "",
   })

   //TODO: usecallback w obu ponizszych ? sprawdz czy zasadne
   const updateServiceRequest = (data: Partial<ServiceRequestData>) => {
      setServiceRequestData(prev => ({ ...prev, data }))
   }

   const renderStepContent = () => {
      switch (currentStep) {
         case 0:
            return (
               <DistrictStep
                  handleDistrictChange={updateServiceRequest}
                  cityName={selectedCity.name}
               />
            )
         // case 1:
         //    return ()
         // case 2:
         //    return ()
         // case 3:
         //    return ()
      }
   }

   return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogHeader>
            <DialogTitle>{steps.find(step => step.id)?.title ?? service.name}</DialogTitle>
         </DialogHeader>
         <DialogContent className="max-w-md">{renderStepContent()}</DialogContent>
         <DialogFooter>nawiagacja</DialogFooter>
      </Dialog>
   )
}
