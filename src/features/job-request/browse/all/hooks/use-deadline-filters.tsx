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
   const [draftDeadlineFrom, setDraftDeadlineFrom] = useState<string | undefined>(undefined)
   const [draftDeadlineTo, setDraftDeadlineTo] = useState<string | undefined>(undefined)

   useEffect(() => {
      setDraftUrgency(activeFilters.deadlineUrgency)
      setDraftDeadlineFrom(activeFilters.deadlineFrom)
      setDraftDeadlineTo(activeFilters.deadlineTo)
   }, [activeFilters.deadlineUrgency, activeFilters.deadlineFrom, activeFilters.deadlineTo])

   const handleUrgencyChange = (urgency?: DeadlineUrgencyFilter) => {
      setDraftUrgency(urgency)

      if (urgency !== DeadlineUrgencyFilter.CUSTOM) {
         setDraftDeadlineFrom(undefined)
         setDraftDeadlineTo(undefined)

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

      const newDeadlineFrom = field === "deadlineFrom" ? formattedDate : draftDeadlineFrom
      const newDeadlineTo = field === "deadlineTo" ? formattedDate : draftDeadlineTo

      const shouldClearUrgency = !newDeadlineFrom && !newDeadlineTo

      if (field === "deadlineFrom") {
         setDraftDeadlineFrom(formattedDate)
      } else {
         setDraftDeadlineTo(formattedDate)
      }

      if (shouldClearUrgency) {
         setDraftUrgency(undefined)
      }

      if (applyOnChange) {
         updateFilters({
            [field]: formattedDate,
            deadlineUrgency: shouldClearUrgency ? undefined : draftUrgency,
         })
      }
   }

   const applyDeadlineFilters = () => {
      updateFilters({
         deadlineUrgency: draftUrgency,
         deadlineFrom: draftDeadlineFrom,
         deadlineTo: draftDeadlineTo,
      })
   }

   const showCustomDates = draftUrgency === DeadlineUrgencyFilter.CUSTOM

   return {
      localUrgency: draftUrgency,
      localDeadlineFrom: draftDeadlineFrom,
      localDeadlineTo: draftDeadlineTo,
      showCustomDates,
      handleUrgencyChange,
      handleCustomDateChange,
      applyDeadlineFilters,
   }
}
