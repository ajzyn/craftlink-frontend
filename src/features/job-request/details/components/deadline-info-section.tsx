import { deadlineLabels, DeadlineType } from "@/features/job-request/shared/types/deadline-types"
import { useBreakpoint } from "@/shared/hooks"
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import { Clock, Zap } from "lucide-react"
import { getFormattedDateTime } from "@/shared/utils/date-utils"
import { SectionContent, SectionIconContent } from "@/shared/components/section"

interface DeadlineInfoProps {
   deadlineType: DeadlineType
   exactDate?: string | null
   deadline?: string | null
   createdAt: string
}

export const DeadlineInfoSection = ({
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

      return `Data stworzenia zlecenia ${getFormattedDateTime(createdAt)}`
   }

   return (
      <Card>
         {isMobile ? (
            <>
               <CardHeader>
                  <h2 className="text-heading-lg">Termin realizacji</h2>
               </CardHeader>
               <CardContent className="flex items-center gap-4">
                  <SectionIconContent icon={Clock} tone="violet">
                     <h3 className="text-lg text-foreground">{deadlineLabels[deadlineType]}</h3>
                     <h3 className="text-sm text-foreground-muted">{getDeadlineText()}</h3>
                  </SectionIconContent>
               </CardContent>
            </>
         ) : (
            <>
               <CardHeader>
                  <h2 className="text-heading-lg">Harmonogram</h2>
               </CardHeader>
               <CardContent className="grid grid-cols-2 gap-4">
                  <SectionContent icon={Zap} label="Priorytet" tone="red">
                     {deadlineLabels[deadlineType]}
                  </SectionContent>
                  <SectionContent icon={Clock} label="Termin realizacji" tone="orange">
                     {getDeadlineText()}
                  </SectionContent>
               </CardContent>
            </>
         )}
      </Card>
   )
}
