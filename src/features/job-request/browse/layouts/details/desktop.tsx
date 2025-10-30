import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { JobRequestCategory } from "@/features/job-request/browse/components/details/category"
import { CreationDate } from "@/features/job-request/browse/components/details/creation-date"
import { JobRequestStatusBadge } from "@/features/job-request/shared/components/status-badge"
import type { JobRequestDetailsDto } from "@/features/job-request/browse/types/data"
import { JobRequestLocation } from "@/features/job-request/browse/components/details/location"
import { DeadlineInfo } from "@/features/job-request/browse/components/details/deadline-info"
import { JobRequestRequester } from "@/features/job-request/browse/components/details/requester"
import { JobRequestDetailsActionList } from "@/features/job-request/browse/components/details/actions"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { Section } from "@/components/section/section"

interface JobRequestDesktopLayoutProps {
   job: JobRequestDetailsDto
}

export const JobRequestDesktopLayout = ({ job }: JobRequestDesktopLayoutProps) => {
   const user = useAuthStore(state => state.user)

   const isOwner = user?.id === job.requester.id

   return (
      <div className="gap-4 grid grid-cols-12">
         <div className="col-span-9 space-y-4">
            <Card>
               <CardHeader className="flex justify-between">
                  <JobRequestCategory service={job.service} />
                  <div className="flex flex-col items-end">
                     <CreationDate createdAt={job.createdAt} />
                     <JobRequestStatusBadge status={job.status} requesterId={job.requester.id} />
                  </div>
               </CardHeader>
               <CardContent>
                  <div>
                     <h2 className="text-heading-lg">Opis zlecenia</h2>
                     <div className="ml-3 rounded-md">{job.description}</div>
                  </div>
               </CardContent>
            </Card>
            <JobRequestLocation city={job.city} district={job.district} />
            <DeadlineInfo
               deadlineType={job.deadlineType}
               createdAt={job.createdAt}
               deadline={job.deadline}
               exactDate={job.exactDate}
            />
         </div>
         <div className="col-span-3 space-y-4">
            {!isOwner && <JobRequestRequester requester={job.requester} />}
            <Section label="Akcje">
               <JobRequestDetailsActionList isOwner={isOwner} requestId={job.id} />
            </Section>
         </div>
      </div>
   )
}
