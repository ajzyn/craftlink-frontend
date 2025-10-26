import type { CityDto } from "@/shared/types/location-types"
import { useState } from "react"

export const useJobRequestUI = () => {
   const [isStepperOpen, setIsStepperOpen] = useState(false)
   const [selectedCity, setSelectedCity] = useState<CityDto | null>(null)

   const handleSelectCity = (city: CityDto | null) => {
      if (city) {
         setSelectedCity(city)
         setIsStepperOpen(true)
      }
   }

   const handleModalClose = () => setIsStepperOpen(false)

   return {
      selectedCity,
      isStepperOpen,
      handleSelectCity,
      handleModalClose,
   }
}
