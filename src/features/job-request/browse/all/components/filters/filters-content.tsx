import { useState } from "react"
import { useJobFilters } from "../../hooks/use-job-filters"
import type { AllJobRequestSearchParams } from "../../types/query"
import { getFormattedDate } from "@/shared/utils"
import { Label } from "@/shared/components/ui/label"
import { Input } from "@/shared/components/ui/input"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { Button } from "@/shared/components/ui/button"
import { FilterGroup } from "./filter-group"
import { DatePicketBtn } from "@/features/job-request/browse/all/components/filters/date-picket-btn"

interface FiltersContentProps {
   activeFilters: AllJobRequestSearchParams
   applyOnChange?: boolean
   onApply?: () => void
}

export const FiltersContent = ({ activeFilters, applyOnChange, onApply }: FiltersContentProps) => {
   const { updateFilters } = useJobFilters()
   const [localCity, setLocalCity] = useState(activeFilters.city ?? "")
   const [localDistrict, setLocalDistrict] = useState(activeFilters.district ?? "")

   const applyTextFilters = () => {
      updateFilters({
         city: localCity || undefined,
         district: localDistrict || undefined,
      })
   }

   const handleTextBlur = () => {
      console.log("blue")
      if (applyOnChange) {
         applyTextFilters()
      }
   }

   const handleTextKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && applyOnChange) {
         applyTextFilters()
      }
   }

   const handleDateChange = (field: "deadlineFrom" | "deadlineTo", date?: Date) => {
      updateFilters({
         [field]: date ? getFormattedDate(date.toISOString()) : undefined,
      })
   }

   const handleApplyClick = () => {
      applyTextFilters()
      onApply?.()
   }

   //TODO: use predefined component for location

   return (
      <div className="space-y-8">
         <FilterGroup title="Lokalizacja">
            <div className="space-y-3">
               <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium text-primary-foreground">
                     Miasto
                  </Label>
                  <Input
                     id="city"
                     placeholder="np. Warszawa"
                     value={localCity}
                     onChange={e => setLocalCity(e.target.value)}
                     onBlur={handleTextBlur}
                     onKeyDown={handleTextKeyDown}
                     className="h-10"
                  />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="district" className="text-sm font-medium text-primary-foreground">
                     Dzielnica
                  </Label>
                  <Input
                     id="district"
                     placeholder="np. Mokotów"
                     value={localDistrict}
                     onChange={e => setLocalDistrict(e.target.value)}
                     onBlur={handleTextBlur}
                     onKeyDown={handleTextKeyDown}
                     className="h-10"
                  />
               </div>
            </div>
         </FilterGroup>

         <FilterGroup title="Dopasowanie">
            <label className="flex items-start gap-3 cursor-pointer group">
               <Checkbox
                  id="matching"
                  checked={activeFilters.matching ?? false}
                  onCheckedChange={checked => updateFilters({ matching: !!checked })}
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
