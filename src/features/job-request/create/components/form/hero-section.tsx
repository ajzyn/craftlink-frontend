import { Search } from "lucide-react"
import { FormAutocomplete } from "@/shared/components/autocomplete/autocomplete"
import type { CityDto } from "@/entities/location"

interface ServiceRequestHeroProps {
   cities: CityDto[]
   handleSelectLocation: (city: CityDto | null) => void
}

export const HeroSection = ({ cities, handleSelectLocation }: ServiceRequestHeroProps) => {
   return (
      <div className="section-content flex flex-col gap-4 items-center mt-12">
         <p className="text-heading-2xl text-center">
            Wyszukaj lokalizacji dla wybranej <span className="text-primary">usługi</span>
         </p>
         <div className="relative w-full max-w-[600px]">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
            <FormAutocomplete
               placeholder="Wybierz lokalizacje..."
               onChange={handleSelectLocation}
               options={cities ?? []}
            />
         </div>
      </div>
   )
}
