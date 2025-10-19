import type { JobRequestDetailsDto } from "@/features/job-request/shared/types/job-request-details"
import { JobRequestStatusBadge } from "@/features/job-request/shared/components/status-badge"
import { CreationDate } from "@/features/job-request/shared/components/details/creation-date"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { JobRequestCategory } from "@/features/job-request/shared/components/details/category"
import { JobRequestDetailsActionList } from "@/features/job-request/shared/components/details/actions"
import { JobRequestLocation } from "@/features/job-request/shared/components/details/location"
import { DeadlineInfo } from "@/features/job-request/shared/components/details/deadline-info"
import { JobRequestRequester } from "@/features/job-request/shared/components/details/requester"

interface JobRequestMobileLayoutProps {
   job: JobRequestDetailsDto
}

export const JobRequestMobileLayout = ({ job }: JobRequestMobileLayoutProps) => {
   return (
      <>
         <div className="flex flex-col gap-2 items-end">
            <JobRequestStatusBadge status={job.status} requesterId={job.requester.id} />
            <CreationDate createdAt={job.createdAt} />
         </div>
         <div className="flex flex-col gap-4 mb-30">
            <Card>
               <CardHeader>
                  <h2 className="text-heading-lg">Kategoria</h2>
               </CardHeader>
               <CardContent>
                  <JobRequestCategory service={job.service} />
               </CardContent>
            </Card>
            <Card>
               <CardHeader>
                  <h2 className="text-heading-lg">Opis zlecenia</h2>
               </CardHeader>
               <CardContent>
                  <div className="ml-3 rounded-md">{job.description}</div>
               </CardContent>
            </Card>
            <JobRequestLocation city={job.city} district={job.district} />
            <DeadlineInfo
               deadlineType={job.deadlineType}
               createdAt={job.createdAt}
               deadline={job.deadline}
               exactDate={job.exactDate}
            />
            <JobRequestRequester requester={job.requester} />
         </div>
         <div className="fixed left-0 w-full bottom-0 py-3 bg-secondary">
            <JobRequestDetailsActionList requestId={job.id} />
         </div>
      </>
   )
}
