import { Card } from "@/components/ui/card"
import { CalendarClock, MapPin } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import type { JobRequestSummaryDto } from "@/features/job-request/browse/types/data"
import { JobRequestStatusBadge } from "@/features/job-request/shared/components/status-badge"
import { getDate } from "@/features/job-request/shared/utils/date"
import { SectionColoredItem } from "@/components/section/section-colored-item"
import { deadlineLabels, DeadlineType } from "@/features/job-request/shared/types/deadline-types"

export const JobRequestCard = ({ job }: { job: JobRequestSummaryDto }) => {
   const navigate = useNavigate()

   return (
      <Card
         onClick={() => navigate({ to: "/zlecenia/$id", params: { id: job.id } })}
         className="cursor-pointer h-64 hover:shadow-lg transition-all border border-gray-200 rounded-xl py-8 px-5 flex flex-col justify-between bg-white"
      >
         <div className="flex justify-between items-start">
            <div>
               <h3 className="font-semibold text-lg">{job.serviceName}</h3>
               <p className="text-sm text-muted-foreground mt-1">Montaż / Naprawa</p>
            </div>
            <div className="space-y-1">
               <JobRequestStatusBadge status={job.status} />
               <p className="text-end text-sm">{getDate(job.createdAt)}</p>
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SectionColoredItem
               icon={MapPin}
               label="Lokalizacja"
               value={
                  <p className="text-sm font-medium">
                     {job.city}, <span>{job.district}</span>
                  </p>
               }
               tone="blue"
            />

            <SectionColoredItem
               icon={CalendarClock}
               label="Termin realizacji"
               tone="violet"
               value={
                  <div className="text-sm font-medium flex flex-col">
                     <span>{deadlineLabels[job.deadlineType]}</span>

                     {job.deadlineType === DeadlineType.EXACT_DATE && job.exactDate && (
                        <span className="text-xs text-muted-foreground">
                           {getDate(job.exactDate)}
                        </span>
                     )}
                  </div>
               }
            />
         </div>
      </Card>
   )
}
