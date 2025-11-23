import { useJobFilters } from "@/features/job-request/browse/all/hooks/use-job-filters"
import type { AllJobRequestSearchParams } from "../../types/query"
import { Badge } from "@/shared/components/ui/badge"
import { getFormattedDate } from "@/shared/utils"
import { X } from "lucide-react"

interface ActiveFiltersBadgesProps {
   activeFilters: AllJobRequestSearchParams
}

interface BadgeItem {
   key: keyof AllJobRequestSearchParams
   label: string
}

export const ActiveFiltersBadges = ({ activeFilters }: ActiveFiltersBadgesProps) => {
   const { clearFilter } = useJobFilters()

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

   if (badges.length === 0) return null

   return (
      <div className="flex flex-wrap gap-2">
         {badges.map(badge => (
            <Badge
               key={badge!.key}
               variant="secondary"
               className="flex items-center gap-1 px-2 py-1 bg-primary/50 text-primary-foreground"
            >
               {badge!.label}
               <X
                  className="h-4 w-4 cursor-pointer"
                  onClick={() => clearFilter(badge!.key as keyof AllJobRequestSearchParams)}
               />
            </Badge>
         ))}
      </div>
   )
}
