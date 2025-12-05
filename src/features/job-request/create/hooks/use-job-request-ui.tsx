import { useCallback, useState } from "react"
import type { CityDto } from "@/entities/location"

export const useJobRequestUI = () => {
   const [isStepperOpen, setIsStepperOpen] = useState(false)
   const [selectedCity, setSelectedCity] = useState<CityDto | null>(null)

   const handleSelectCity = useCallback((city: CityDto) => {
      if (city) {
         setSelectedCity(city)
         setIsStepperOpen(true)
      }
   }, [])

   const handleModalClose = useCallback(() => setIsStepperOpen(false), [])

   return {
      selectedCity,
      isStepperOpen,
      handleSelectCity,
      handleModalClose,
   }
}
