import type { AllJobsFiltersProps } from "@/features/job-request/browse/all/types/props"
import { useJobFilters } from "../../hooks/use-job-filters"
import { Button } from "@/shared/components/ui/button"
import { FiltersContent } from "@/features/job-request/browse/all/components/filters/filters-content"

export const DesktopFilters = ({ activeFilters }: AllJobsFiltersProps) => {
   const { clearAll, hasActiveFilters } = useJobFilters()

   return (
      <aside className="w-80 space-y-12 py-10 px-8 h-[calc(100vh-64px)] bg-white">
         <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg text-primary-foreground h-8">Filtry</h3>
            {hasActiveFilters && (
               <Button size="sm" onClick={clearAll} className="text-primary-foreground">
                  Wyczyść
               </Button>
            )}
         </div>

         <FiltersContent activeFilters={activeFilters} applyOnChange />
      </aside>
   )
}
