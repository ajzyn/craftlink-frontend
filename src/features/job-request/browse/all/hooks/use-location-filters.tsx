import { useEffect, useMemo, useState } from "react"
import { useCitiesQuery, useCityDistrictsQuery } from "@/entities/location"
import { toast } from "sonner"
import type { ComboboxOption } from "@/shared/components/autocomplete/combobox"
import type { FiltersProps } from "@/features/job-request/browse/all/types/props"

export const useLocationFilters = ({
   activeFilters,
   applyOnChange,
   updateFilters,
}: FiltersProps) => {
   const [hasDistrict, setHasDistrict] = useState(false)
   const [draftCity, setDraftCity] = useState<string | null>(null)
   const [draftDistrict, setDraftDistrict] = useState("")

   const localCity = applyOnChange ? (activeFilters.city ?? null) : draftCity
   const localDistrict = applyOnChange ? (activeFilters.district ?? "") : draftDistrict

   const { data: cities, isError: isErrorFetchingCities } = useCitiesQuery()
   const { data: districts, isError: isErrorFetchingDistricts } = useCityDistrictsQuery(
      localCity ?? undefined,
   )

   const citiesOptions: ComboboxOption[] = useMemo(() => {
      return cities?.map(city => ({ value: city.name, label: city.name })) ?? []
   }, [cities])

   useEffect(() => {
      if (isErrorFetchingCities) {
         toast.error("Nie udało się pobrać listy miast")
      }
   }, [isErrorFetchingCities])

   useEffect(() => {
      if (isErrorFetchingDistricts) {
         toast.error("Nie udało się pobrać listy dzielnic")
      }
   }, [isErrorFetchingDistricts])

   useEffect(() => {
      if (!applyOnChange) {
         setDraftCity(activeFilters.city ?? null)
         setDraftDistrict(activeFilters.district ?? "")
      }
   }, [applyOnChange, activeFilters.city, activeFilters.district])

   const handleCityChange = (selectedCity: string | null) => {
      if (applyOnChange) {
         updateFilters({
            city: selectedCity ?? undefined,
            district: selectedCity !== localCity ? undefined : activeFilters.district,
         })
      } else {
         setDraftCity(selectedCity)
         if (selectedCity !== localCity) {
            setDraftDistrict("")
         }
      }

      const city = cities?.find(c => c.name.toLowerCase() === selectedCity?.toLowerCase())
      if (city?.hasDistricts) {
         setHasDistrict(true)
      }
   }

   const handleDistrictChange = (district: string | null) => {
      if (applyOnChange) {
         updateFilters({
            district: district ?? undefined,
         })
      } else {
         setDraftDistrict(district ?? "")
      }
   }

   const applyLocationFilters = () => {
      updateFilters({
         city: draftCity ?? undefined,
         district: draftDistrict || undefined,
      })
   }

   return {
      cities: citiesOptions,
      districts,
      localCity,
      localDistrict,
      handleCityChange,
      handleDistrictChange,
      applyLocationFilters,
      hasDistrict,
   }
}
