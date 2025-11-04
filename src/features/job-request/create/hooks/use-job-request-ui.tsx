import { useState } from "react"
import type { CityDto } from "@/entities/location"

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
