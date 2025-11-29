import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/shared/components/ui/sheet"
import { useJobFilters } from "../../hooks/use-job-filters"
import type { AllJobsFiltersProps } from "../../types/props"
import { Button } from "@/shared/components/ui/button"
import { FiltersContent } from "@/features/job-request/browse/all/components/filters/filters-content"
import { useState } from "react"
import { SlidersHorizontal } from "lucide-react"

export const MobileFilters = ({ activeFilters }: AllJobsFiltersProps) => {
   const { clearAll, hasActiveFilters } = useJobFilters()
   const [isOpen, setIsOpen] = useState(false)

   return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
         <div className="absolute top-7 left-3">
            <SheetTrigger asChild>
               <Button variant="ghost" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtry
               </Button>
            </SheetTrigger>
         </div>

         <SheetContent side="left" className="w-80 overflow-y-auto p-4">
            <SheetHeader>
               <div className="flex items-center justify-between mt-6 h-8">
                  <SheetTitle>Filtry</SheetTitle>
                  {hasActiveFilters && (
                     <Button className="bg-primary/50" size="sm" onClick={clearAll}>
                        Wyczyść
                     </Button>
                  )}
               </div>
            </SheetHeader>
            <SheetDescription className="sr-only">
               Filtruj zlecenia według lokalizacji, dopasowania i terminu realizacji
            </SheetDescription>

            <FiltersContent activeFilters={activeFilters} onApply={() => setIsOpen(false)} />
         </SheetContent>
      </Sheet>
   )
}
