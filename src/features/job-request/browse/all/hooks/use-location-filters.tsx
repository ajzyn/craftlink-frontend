import { useEffect, useMemo, useState } from "react"
import { useCitiesQuery, useCityDistrictsQuery } from "@/entities/location"
import { toast } from "sonner"
import type { AllJobRequestSearchParams } from "@/features/job-request/browse/all/types/query"
import type { ComboboxOption } from "@/shared/components/autocomplete/combobox"

interface UseLocationFiltersProps {
   activeFilters: AllJobRequestSearchParams
   applyOnChange: boolean
   updateFilters: (filters: Partial<AllJobRequestSearchParams>) => void
}

export const useLocationFilters = ({
   activeFilters,
   applyOnChange,
   updateFilters,
}: UseLocationFiltersProps) => {
   const [hasDistrict, setHasDistrict] = useState(false)
   const [draftCity, setDraftCity] = useState<string | null>(null)
   const [draftDistrict, setDraftDistrict] = useState<string>("")

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

   const handleCityChange = (city: string | null) => {
      if (applyOnChange) {
         updateFilters({
            city: city ?? undefined,
            district: city !== localCity ? undefined : activeFilters.district,
         })
      } else {
         setDraftCity(city)
         if (city !== localCity) {
            setDraftDistrict("")
         }
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

      const city = citiesOptions.find(
         ({ value }) => value.toLowerCase() === district?.toLowerCase(),
      )
      setHasDistrict(city?.label !== district)
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
