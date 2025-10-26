import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { JobRequestCategory } from "@/features/job-request/browse/components/category"
import { CreationDate } from "@/features/job-request/browse/components/creation-date"
import { JobRequestStatusBadge } from "@/features/job-request/shared/components/status-badge"
import type { JobRequestDetailsDto } from "@/features/job-request/browse/types/data"
import { JobRequestLocation } from "@/features/job-request/browse/components/location"
import { DeadlineInfo } from "@/features/job-request/browse/components/deadline-info"
import { JobRequestRequester } from "@/features/job-request/browse/components/requester"
import { JobRequestDetailsActionList } from "@/features/job-request/browse/components/actions"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"

interface JobRequestDesktopLayoutProps {
   job: JobRequestDetailsDto
}

export const JobRequestDesktopLayout = ({ job }: JobRequestDesktopLayoutProps) => {
   const { user } = useAuthStore()

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
            {!isOwner && (
               <>
                  <JobRequestRequester requester={job.requester} />
                  <Card>
                     <CardHeader>
                        <h2 className="text-heading-lg">Akcje</h2>
                     </CardHeader>
                     <CardContent>
                        <JobRequestDetailsActionList requestId={job.id} />
                     </CardContent>
                  </Card>
               </>
            )}
         </div>
      </div>
   )
}
