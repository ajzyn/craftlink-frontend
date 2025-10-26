import type { CityDto } from "@/shared/types/location-types"
import { CategoryBanner } from "@/components/category-banner"
import { Search } from "lucide-react"
import { FormAutocomplete } from "@/components/autocomplete/autocomplete"
import type { ServiceDetailsDto } from "@/features/services/types/data"

interface ServiceRequestHeroProps {
   service?: ServiceDetailsDto
   cities?: CityDto[]
   isLoadingService: boolean
   handleSelectLocation: (city: CityDto | null) => void
}

export const JobRequestHero = ({
   service,
   cities,
   isLoadingService,
   handleSelectLocation,
}: ServiceRequestHeroProps) => {
   return (
      <div>
         <CategoryBanner
            name={service?.name}
            iconName={service?.category?.iconName}
            imageUrl={service?.category?.imageKey}
            isLoading={isLoadingService}
         />
         <div className="section-content flex flex-col gap-4 items-center mt-12">
            <p className="text-heading-2xl text-center">
               Wyszukaj lokalizacji dla wybranej <span className="text-primary">usługi</span>
            </p>
            <div className="relative w-full max-w-[600px]">
               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 z-10" />
               <FormAutocomplete
                  placeholder="Wybierz lokalizacje..."
                  onChange={handleSelectLocation}
                  options={cities}
               />
            </div>
         </div>
      </div>
   )
}
