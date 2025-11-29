import type { AllJobRequestSearchParams } from "@/features/job-request/browse/all/types/filters"

export interface AllJobsFiltersProps {
   activeFilters: AllJobRequestSearchParams
}

export interface FiltersProps extends AllJobsFiltersProps {
   updateFilters: (filters: Partial<AllJobRequestSearchParams>) => void
   applyOnChange: boolean
}
