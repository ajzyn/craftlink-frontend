import { Card } from "@/shared/components/ui/card"
import { CalendarClock, MapPin } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import type { JobRequestSummaryDto } from "@/features/job-request/api/types"
import { JobRequestStatusBadge } from "@/features/job-request/shared/components/status-badge"
import { getFormattedDate } from "@/shared/utils/date-utils"
import { deadlineLabels, DeadlineType } from "@/features/job-request/shared/types/deadline-types"
import { SectionContent } from "@/shared/components/section"

export const JobRequestCard = ({ job }: { job: JobRequestSummaryDto }) => {
   const navigate = useNavigate()

   return (
      <Card
         onClick={() => navigate({ to: "/zlecenia/$id", params: { id: job.id } })}
         className="cursor-pointer min-h-64 hover:shadow-lg transition-all border border-gray-200 rounded-xl py-8 px-5 flex flex-col justify-between bg-white"
      >
         <div className="flex justify-between items-start">
            <div>
               <h3 className="font-semibold text-lg">{job.serviceName}</h3>
               <p className="text-sm text-muted-foreground mt-1">Montaż / Naprawa</p>
            </div>
            <div className="space-y-1">
               <JobRequestStatusBadge status={job.status} />
               <p className="text-end text-sm">{getFormattedDate(job.createdAt)}</p>
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SectionContent icon={MapPin} label="Lokalizacja" tone="blue">
               <p className="text-sm font-medium">
                  {job.city}, <span>{job.district}</span>
               </p>
            </SectionContent>

            <SectionContent icon={CalendarClock} label="Termin realizacji" tone="violet">
               <div className="text-sm font-medium flex flex-col">
                  <span>{deadlineLabels[job.deadlineType]}</span>

                  {job.deadlineType === DeadlineType.EXACT_DATE && job.exactDate && (
                     <span className="text-xs text-muted-foreground">
                        {getFormattedDate(job.exactDate)}
                     </span>
                  )}
               </div>
            </SectionContent>
         </div>
      </Card>
   )
}
