import { useJobFilters } from "../../hooks/use-job-filters"
import { useLocationFilters } from "../../hooks/use-location-filters"
import { type AllJobRequestSearchParams } from "../../types/filters"
import { Label } from "@/shared/components/ui/label"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { Button } from "@/shared/components/ui/button"
import { FilterGroup } from "./filter-group"
import { FormAutocomplete } from "@/shared/components/autocomplete/autocomplete"
import { Combobox } from "@/shared/components/autocomplete/combobox"
import { DeadlineUrgencyRadio } from "@/features/job-request/browse/all/components/filters/deadline-urgency-radio"
import { useDeadlineFilters } from "../../hooks/use-deadline-filters"
import { useMatchingFilter } from "../../hooks/use-matching.filter"
import { DatePicker } from "@/shared/components/date-picker"

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

   const { localMatching, handleMatchingChange, applyMatchingFilter } = useMatchingFilter({
      activeFilters,
      applyOnChange,
      updateFilters,
   })

   const {
      localUrgency,
      localDeadlineFrom,
      localDeadlineTo,
      showCustomDates,
      handleUrgencyChange,
      handleCustomDateChange,
      applyDeadlineFilters,
   } = useDeadlineFilters({
      activeFilters,
      applyOnChange,
      updateFilters,
   })

   const handleApplyClick = () => {
      applyLocationFilters()
      applyMatchingFilter()
      applyDeadlineFilters()
      onApply?.()
   }

   const hasLocalChanges =
      (localCity ?? undefined) !== activeFilters.city ||
      (localDistrict || undefined) !== activeFilters.district ||
      localMatching !== (activeFilters.matching ?? false) ||
      localUrgency !== activeFilters.deadlineUrgency ||
      localDeadlineFrom !== activeFilters.deadlineFrom ||
      localDeadlineTo !== activeFilters.deadlineTo

   return (
      <div className="space-y-8">
         <FilterGroup title="Lokalizacja">
            <div className="space-y-3">
               <div className="space-y-2">
                  <Label className="text-sm font-medium text-primary-foreground">Miasto</Label>
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
                     <Label className="text-sm font-medium text-primary-foreground">
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
                  checked={localMatching}
                  onCheckedChange={handleMatchingChange}
                  className="mt-1"
               />
               <span className="text-sm leading-normal group-hover:text-foreground/80 transition-colors">
                  Tylko dopasowane do moich umiejętności
               </span>
            </label>
         </FilterGroup>

         <FilterGroup title="Termin realizacji">
            <div className="space-y-4">
               <DeadlineUrgencyRadio value={localUrgency} onChange={handleUrgencyChange} />

               {showCustomDates && (
                  <div className="space-y-3 pt-2 border-t border-border/50">
                     <div className="space-y-1.5">
                        <Label className="text-sm text-primary-foreground">Od</Label>
                        <DatePicker
                           value={localDeadlineFrom}
                           onChange={date => handleCustomDateChange("deadlineFrom", date)}
                           {...(localDeadlineTo && { maxDate: new Date(localDeadlineTo) })}
                        />
                     </div>
                     <div className="space-y-1.5">
                        <Label className="text-sm text-primary-foreground">Do</Label>
                        <DatePicker
                           value={localDeadlineTo}
                           onChange={date => handleCustomDateChange("deadlineTo", date)}
                           {...(localDeadlineFrom && { minDate: new Date(localDeadlineFrom) })}
                        />
                     </div>
                  </div>
               )}
            </div>
         </FilterGroup>

         {!applyOnChange && (
            <Button className="w-full" disabled={!hasLocalChanges} onClick={handleApplyClick}>
               Zastosuj filtry
            </Button>
         )}
      </div>
   )
}
