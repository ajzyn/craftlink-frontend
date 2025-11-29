import { useEffect, useState } from "react"
import { DeadlineUrgencyFilter } from "../types/filters"
import { getBackendCompatibleDate } from "@/shared/utils"
import type { FiltersProps } from "@/features/job-request/browse/all/types/props"

export const useDeadlineFilters = ({
   activeFilters,
   applyOnChange,
   updateFilters,
}: FiltersProps) => {
   const [draftUrgency, setDraftUrgency] = useState<DeadlineUrgencyFilter | undefined>(undefined)
   const [draftCustomFrom, setDraftCustomFrom] = useState<string | undefined>(undefined)
   const [draftCustomTo, setDraftCustomTo] = useState<string | undefined>(undefined)

   useEffect(() => {
      setDraftUrgency(activeFilters.deadlineUrgency)
      setDraftCustomFrom(activeFilters.deadlineFrom)
      setDraftCustomTo(activeFilters.deadlineTo)
   }, [activeFilters.deadlineUrgency, activeFilters.deadlineFrom, activeFilters.deadlineTo])

   const handleUrgencyChange = (urgency?: DeadlineUrgencyFilter) => {
      setDraftUrgency(urgency)

      if (urgency !== DeadlineUrgencyFilter.CUSTOM) {
         setDraftCustomFrom(undefined)
         setDraftCustomTo(undefined)

         if (applyOnChange) {
            updateFilters({
               deadlineUrgency: urgency,
               deadlineFrom: undefined,
               deadlineTo: undefined,
            })
         }
      }
   }

   const handleCustomDateChange = (field: "deadlineFrom" | "deadlineTo", date?: Date) => {
      const formattedDate = date ? getBackendCompatibleDate(date) : undefined

      if (field === "deadlineFrom") {
         setDraftCustomFrom(formattedDate)
      } else {
         setDraftCustomTo(formattedDate)
      }
      setDraftUrgency(DeadlineUrgencyFilter.CUSTOM)

      if (applyOnChange) {
         updateFilters({
            deadlineUrgency: DeadlineUrgencyFilter.CUSTOM,
            [field]: formattedDate,
         })
      }
   }

   const applyDeadlineFilters = () => {
      updateFilters({
         deadlineUrgency: draftUrgency,
         deadlineFrom: draftCustomFrom,
         deadlineTo: draftCustomTo,
      })
   }

   const showCustomDates = draftUrgency === DeadlineUrgencyFilter.CUSTOM

   return {
      localUrgency: draftUrgency,
      localCustomFrom: draftCustomFrom,
      localCustomTo: draftCustomTo,
      showCustomDates,
      handleUrgencyChange,
      handleCustomDateChange,
      applyDeadlineFilters,
   }
}
