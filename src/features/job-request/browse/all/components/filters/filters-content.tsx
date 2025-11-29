import { useJobFilters } from "../../hooks/use-job-filters"
import { useLocationFilters } from "../../hooks/use-location-filters"
import type { AllJobRequestSearchParams } from "../../types/query"
import { getFormattedDate } from "@/shared/utils"
import { Label } from "@/shared/components/ui/label"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { Button } from "@/shared/components/ui/button"
import { FilterGroup } from "./filter-group"
import { DatePicketBtn } from "./date-picket-btn"
import { FormAutocomplete } from "@/shared/components/autocomplete/autocomplete"
import { Combobox } from "@/shared/components/autocomplete/combobox"

interface FiltersContentProps {
   activeFilters: AllJobRequestSearchParams
   applyOnChange?: boolean
   onApply?: () => void
}

export const FiltersContent = ({
   activeFilters,
   applyOnChange = false,
   onApply,
}: FiltersContentProps) => {
   const { updateFilters } = useJobFilters()

   const {
      cities,
      districts,
      localCity,
      localDistrict,
      handleCityChange,
      handleDistrictChange,
      applyLocationFilters,
      hasDistrict,
   } = useLocationFilters({
      activeFilters,
      applyOnChange,
      updateFilters,
   })

   const handleDateChange = (field: "deadlineFrom" | "deadlineTo", date?: Date) => {
      updateFilters({
         [field]: date ? getFormattedDate(date.toISOString()) : undefined,
      })
   }

   const handleApplyClick = () => {
      applyLocationFilters()
      onApply?.()
   }

   return (
      <div className="space-y-8">
         <FilterGroup title="Lokalizacja">
            <div className="space-y-3">
               <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium text-primary-foreground">
                     Miasto
                  </Label>
                  <Combobox
                     placeholder="np. Warszawa"
                     onChange={handleCityChange}
                     options={cities ?? []}
                     className="h-10 py-1 px-3"
                     value={localCity ?? undefined}
                  />
               </div>
               {hasDistrict && (
                  <div className="space-y-2">
                     <Label
                        htmlFor="district"
                        className="text-sm font-medium text-primary-foreground"
                     >
                        Dzielnica
                     </Label>
                     <FormAutocomplete
                        placeholder="np. Mokotów"
                        options={districts ?? []}
                        value={localDistrict}
                        onChange={handleDistrictChange}
                        className="h-10 py-1 px-3"
                     />
                  </div>
               )}
            </div>
         </FilterGroup>

         <FilterGroup title="Dopasowanie">
            <label className="flex items-start gap-3 cursor-pointer group">
               <Checkbox
                  id="matching"
                  checked={activeFilters.matching ?? false}
                  onCheckedChange={checked =>
                     updateFilters({ matching: checked ? true : undefined })
                  }
                  className="mt-1"
               />
               <span className="text-sm leading-normal group-hover:text-foreground/80 transition-colors">
                  Tylko dopasowane do moich umiejętności
               </span>
            </label>
         </FilterGroup>

         <FilterGroup title="Termin realizacji">
            <div className="space-y-3">
               <div className="space-y-1.5">
                  <Label className="text-sm text-primary-foreground">Od</Label>
                  <DatePicketBtn
                     value={activeFilters.deadlineFrom}
                     onChange={date => handleDateChange("deadlineFrom", date)}
                  />
               </div>
               <div className="space-y-1.5">
                  <Label className="text-sm text-primary-foreground">Do</Label>
                  <DatePicketBtn
                     value={activeFilters.deadlineTo}
                     onChange={date => handleDateChange("deadlineTo", date)}
                  />
               </div>
            </div>
         </FilterGroup>

         {!applyOnChange && (
            <Button className="w-full" onClick={handleApplyClick}>
               Zastosuj filtry
            </Button>
         )}
      </div>
   )
}
