import type { FiltersProps } from "@/features/job-request/browse/all/types/props"
import { useEffect, useState } from "react"

export const useMatchingFilter = ({
   activeFilters,
   applyOnChange,
   updateFilters,
}: FiltersProps) => {
   const [draftMatching, setDraftMatching] = useState(true)

   useEffect(() => {
      setDraftMatching(activeFilters.matching ?? false)
   }, [activeFilters.matching])

   const handleMatchingChange = (checked: boolean) => {
      setDraftMatching(checked)

      if (applyOnChange) {
         updateFilters({ matching: checked ? true : undefined })
      }
   }

   const applyMatchingFilter = () => {
      updateFilters({ matching: draftMatching ? true : undefined })
   }

   return {
      localMatching: draftMatching,
      handleMatchingChange,
      applyMatchingFilter,
   }
}
