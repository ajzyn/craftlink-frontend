import type { JobRequestSummaryDto } from "@/features/job-request/api/types"
import type { AllJobRequestSearchParams } from "@/features/job-request/browse/all/types/filters"
import { Container } from "@/shared/components/container"
import { JobRequestListHero } from "@/features/job-request/browse/shared/components/job-request-list-hero"
import { EmptyState } from "@/shared/components/empty-state"
import { Button } from "@/shared/components/ui/button"
import { JobRequestGrid } from "@/features/job-request/browse/shared/components/job-request-grid"
import { useJobFilters } from "../hooks/use-job-filters"
import { X } from "lucide-react"
import { ActiveFiltersBadges } from "@/features/job-request/browse/all/components/filters/active-filters-badges"
import { useBreakpoint } from "@/shared/hooks"
import { DesktopFilters } from "@/features/job-request/browse/all/components/filters/desktop-filters"
import { MobileFilters } from "@/features/job-request/browse/all/components/filters/mobile-filters"

interface AllJobsListProps {
   jobs?: JobRequestSummaryDto[]
   activeFilters: AllJobRequestSearchParams
   isLoading: boolean
   isFetchingNextPage: boolean
}

export const AllJobsList = ({
   jobs,
   activeFilters,
   isFetchingNextPage,
   isLoading,
}: AllJobsListProps) => {
   const { hasActiveFilters, clearAll } = useJobFilters()
   const { isDesktop } = useBreakpoint()
   const isListEmpty = !isLoading && jobs?.length === 0

   return (
      <div className="flex relative">
         {isDesktop && (
            <aside>
               <DesktopFilters activeFilters={activeFilters} />
            </aside>
         )}
         {!isDesktop && <MobileFilters activeFilters={activeFilters} />}

         <section className="flex-1 mx-6 md:mx-10">
            <Container className="md:bg-white px-0!">
               <div className="flex gap-2 flex-wrap flex-1 min-h-[26px]">
                  {hasActiveFilters && isDesktop && (
                     <ActiveFiltersBadges activeFilters={activeFilters} />
                  )}
               </div>

               <JobRequestListHero
                  description="Przeglądaj zlecenia z całej Polski. Znajdź oferty dopasowane do Twoich umiejętności."
                  title="Wszystkie zlecenia"
                  className="my-8"
               />

               <div className="my-12">
                  {isListEmpty ? (
                     <EmptyState
                        title={hasActiveFilters ? "Brak zleceń" : "Brak dostępnych zleceń"}
                        description={
                           hasActiveFilters
                              ? "Nie znaleziono zleceń spełniających wybrane kryteria. Spróbuj zmienić filtry."
                              : "Aktualnie nie ma dostępnych zleceń. Sprawdź ponownie później."
                        }
                     >
                        {hasActiveFilters && (
                           <Button
                              className="flex mx-auto mt-8"
                              variant="outline"
                              onClick={clearAll}
                           >
                              <X className="h-5 w-5 mr-2" />
                              Wyczyść filtry
                           </Button>
                        )}
                     </EmptyState>
                  ) : (
                     <JobRequestGrid
                        isFetchingNextPage={isFetchingNextPage}
                        isLoading={isLoading}
                        jobs={jobs}
                     />
                  )}
               </div>
            </Container>
         </section>
      </div>
   )
}
