import { type CityDto, useCitiesQuery } from "@/entities/location"
import { toast } from "sonner"
import { useCallback, useMemo } from "react"
import { ComboboxWithSearchIcon } from "@/shared/components/autocomplete/combobox-with-search-icon"

interface ServiceRequestHeroProps {
   onSelectLocation: (city: CityDto) => void
}

export const HeroSection = ({ onSelectLocation }: ServiceRequestHeroProps) => {
   const { data: cities, isLoading, isError } = useCitiesQuery()

   if (isError) {
      toast.error("Wystąpił błąd. Proszę spróbować później")
   }

   const handleSelectLocation = useCallback(
      (result: string | null) => {
         if (!result) {
            return
         }

         const city = cities?.find(city => city.name === result)
         if (city) {
            onSelectLocation(city)
         }
      },
      [onSelectLocation, cities],
   )

   const citiesOptions = useMemo(() => {
      if (!cities) {
         return []
      }

      return cities.map(city => ({ value: city.name, label: city.name }))
   }, [cities])

   return (
      <div className="section-content flex flex-col gap-4 items-center mt-12">
         <p className="text-heading-2xl text-center">
            Wyszukaj lokalizacji dla wybranej <span className="text-primary">usługi</span>
         </p>
         <div className="w-full max-w-[600px]">
            <ComboboxWithSearchIcon
               placeholder="Wyszukaj lokalizacje..."
               options={citiesOptions}
               isLoading={isLoading}
               onOptionChange={handleSelectLocation}
            />
         </div>
      </div>
   )
}
