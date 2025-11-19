import { HeroSection } from "@/features/job-request/create/components/hero-section"
import { CreationModal } from "@/features/job-request/create/components/creation-modal"
import { useJobRequestUI } from "@/features/job-request/create/hooks/use-job-request-ui"
import { useMemo } from "react"
import { capitalizeFirstLetter } from "@/shared/utils/string-utils"
import type { CityDto } from "@/entities/location"
import type { ServiceDetailsDto } from "@/entities/service"

interface CreateViewProps {
   selectedService: ServiceDetailsDto
   rawCities?: CityDto[]
   isLoadingService: boolean
   isLoadingCities: boolean
}

export const CreateView = ({
   selectedService,
   rawCities,
   isLoadingService,
   isLoadingCities,
}: CreateViewProps) => {
   const { isStepperOpen, selectedCity, handleSelectCity, handleModalClose } = useJobRequestUI()

   const cities = useMemo(() => {
      if (!rawCities) {
         return []
      }
      return rawCities.map(city => ({ ...city, name: capitalizeFirstLetter(city.name) }))
   }, [rawCities])

   return (
      <div>
         <HeroSection
            service={selectedService}
            cities={cities}
            isLoadingService={isLoadingService || isLoadingCities}
            handleSelectLocation={handleSelectCity}
         />

         {selectedCity && isStepperOpen && (
            <CreationModal
               isOpen={isStepperOpen}
               handleClose={handleModalClose}
               selectedCity={selectedCity}
               service={selectedService}
            />
         )}
      </div>
   )
}
