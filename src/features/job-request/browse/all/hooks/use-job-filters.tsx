import { useNavigate, useSearch } from "@tanstack/react-router"
import type { AllJobRequestSearchParams } from "../types/filters"

export const useJobFilters = () => {
   const navigate = useNavigate({ from: "/zlecenia" })
   const filters = useSearch({ from: "/zlecenia" }) as AllJobRequestSearchParams

   const updateFilters = (newFilters: Partial<AllJobRequestSearchParams>) => {
      navigate({
         search: (prev: AllJobRequestSearchParams) => ({ ...prev, ...newFilters }),
      })
   }

   const clearFilter = (key: keyof AllJobRequestSearchParams) => {
      const { [key]: _, ...rest } = filters
      navigate({ search: rest })
   }

   const clearAll = () => {
      navigate({ search: {} })
   }

   const hasActiveFilters = Object.keys(filters).length > 0

   return {
      filters,
      updateFilters,
      clearFilter,
      clearAll,
      hasActiveFilters,
   }
}
