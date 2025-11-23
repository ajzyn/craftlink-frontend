import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/shared/components/ui/sheet"
import { useJobFilters } from "../../hooks/use-job-filters"
import type { AllJobsFiltersProps } from "../../types/props"
import { Button } from "@/shared/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import { FiltersContent } from "@/features/job-request/browse/all/components/filters/filters-content"
import { useState } from "react"
import { ActiveFiltersBadges } from "@/features/job-request/browse/all/components/filters/active-filters-badges"

export const MobileFilters = ({ activeFilters }: AllJobsFiltersProps) => {
   const { clearAll, hasActiveFilters } = useJobFilters()
   const [isOpen, setIsOpen] = useState(false)
   const activeFiltersCount = Object.keys(activeFilters).length

   return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
         <div className="absolute top-7 left-7 flex gap-2">
            <SheetTrigger asChild>
               <Button variant="ghost" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtry
               </Button>
            </SheetTrigger>
            {activeFiltersCount > 0 && <ActiveFiltersBadges activeFilters={activeFilters} />}
         </div>

         <SheetContent side="left" className="w-80 overflow-y-auto px-6">
            <SheetHeader>
               <div className="flex items-center justify-between mt-10">
                  <SheetTitle>Filtry</SheetTitle>
                  {hasActiveFilters && (
                     <Button className="bg-primary/50" size="sm" onClick={clearAll}>
                        Wyczyść
                     </Button>
                  )}
               </div>
            </SheetHeader>

            <FiltersContent activeFilters={activeFilters} onApply={() => setIsOpen(false)} />
         </SheetContent>
      </Sheet>
   )
}
