import { useJobFilters } from "@/features/job-request/browse/all/hooks/use-job-filters"
import type { AllJobRequestSearchParams } from "../../types/filters"
import { Badge } from "@/shared/components/ui/badge"
import { getFormattedDate } from "@/shared/utils"
import { X } from "lucide-react"
import { isEmpty } from "lodash"
import { cn } from "@/lib/utils"
import { useBreakpoint } from "@/shared/hooks"

interface ActiveFiltersBadgesProps {
   activeFilters: AllJobRequestSearchParams
}

interface BadgeItem {
   key: keyof AllJobRequestSearchParams
   label: string
}

export const ActiveFiltersBadges = ({ activeFilters }: ActiveFiltersBadgesProps) => {
   const { clearFilter } = useJobFilters()
   const { isMobile } = useBreakpoint()

   const badges = [
      activeFilters.city && {
         key: "city",
         label: activeFilters.city,
      },
      activeFilters.district && {
         key: "district",
         label: activeFilters.district,
      },
      activeFilters.matching && {
         key: "matching",
         label: "Dopasowane",
      },
      activeFilters.deadlineFrom && {
         key: "deadlineFrom",
         label: `Od: ${getFormattedDate(activeFilters.deadlineFrom)}`,
      },
      activeFilters.deadlineTo && {
         key: "deadlineTo",
         label: `Do: ${getFormattedDate(activeFilters.deadlineTo)}`,
      },
   ].filter(Boolean) as BadgeItem[]

   if (isEmpty(badges)) return null

   return (
      <div
         className={cn(
            "flex gap-2",
            isMobile && "overflow-x-scroll scrollbar-hide -mx-6 px-6 pt-4",
            !isMobile && "flex-wrap",
         )}
      >
         {badges.map(badge => (
            <Badge
               onClick={() => clearFilter(badge.key)}
               key={badge.key}
               variant="secondary"
               className="flex items-center shrink-0 gap-1 px-2 py-1 text-sm bg-primary/50 text-primary-foreground capitalize cursor-pointer"
            >
               {badge.label}
               <X className="h-6 w-6" />
            </Badge>
         ))}
      </div>
   )
}
