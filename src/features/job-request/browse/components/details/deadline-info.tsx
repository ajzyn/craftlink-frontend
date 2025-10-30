import { deadlineLabels, DeadlineType } from "@/features/job-request/shared/types/deadline-types"
import { useBreakpoint } from "@/shared/hooks/use-breakpoint"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Clock, Zap } from "lucide-react"
import { getDateTime } from "@/features/job-request/shared/utils/date"
import { SectionColoredItem } from "@/components/section/section-colored-item"
import { SectionContentWithIcon } from "@/components/section/section-content-with-icon"

interface DeadlineInfoProps {
   deadlineType: DeadlineType
   exactDate?: string | null
   deadline?: string | null
   createdAt: string
}

export const DeadlineInfo = ({
   deadlineType,
   exactDate,
   deadline,
   createdAt,
}: DeadlineInfoProps) => {
   const { isMobile } = useBreakpoint()

   const getDeadlineText = () => {
      if (deadlineType === DeadlineType.EXACT_DATE) {
         return `W dniu ${exactDate}`
      }

      if (
         deadlineType === DeadlineType.WITHIN_2_WEEKS ||
         deadlineType === DeadlineType.WITHIN_5_DAYS
      ) {
         return `Do ${deadline}`
      }

      return `Data stworzenia zlecenia ${getDateTime(createdAt)}`
   }

   return (
      <Card>
         {isMobile ? (
            <>
               <CardHeader>
                  <h2 className="text-heading-lg">Termin realizacji</h2>
               </CardHeader>
               <CardContent className="flex items-center gap-4">
                  <SectionContentWithIcon icon={Clock} tone="violet">
                     <h3 className="text-lg text-foreground">{deadlineLabels[deadlineType]}</h3>
                     <h3 className="text-sm text-foreground-muted">{getDeadlineText()}</h3>
                  </SectionContentWithIcon>
               </CardContent>
            </>
         ) : (
            <>
               <CardHeader>
                  <h2 className="text-heading-lg">Harmonogram</h2>
               </CardHeader>
               <CardContent className="grid grid-cols-2 gap-4">
                  <SectionColoredItem
                     icon={Zap}
                     label="Priorytet"
                     value={deadlineLabels[deadlineType]}
                     tone="red"
                  />
                  <SectionColoredItem
                     icon={Clock}
                     label="Termin realizacji"
                     value={getDeadlineText()}
                     tone="orange"
                  />
               </CardContent>
            </>
         )}
      </Card>
   )
}
