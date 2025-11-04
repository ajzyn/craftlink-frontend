import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { CategorySection } from "@/features/job-request/details/components/category-section"
import { CreationDateValue } from "@/features/job-request/details/components/creation-date-value"
import { JobRequestStatusBadge } from "@/features/job-request/shared/components/status-badge"
import type { JobRequestDetailsDto } from "@/features/job-request/api/types"
import { LocationSection } from "@/features/job-request/details/components/location-section"
import { DeadlineInfoSection } from "@/features/job-request/details/components/deadline-info-section"
import { RequesterSection } from "@/features/job-request/details/components/requester-section"
import { ActionsSection } from "@/features/job-request/details/components/actions-section"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { Section } from "@/shared/components/section"

interface JobRequestDesktopLayoutProps {
   job: JobRequestDetailsDto
}

export const DesktopLayout = ({ job }: JobRequestDesktopLayoutProps) => {
   const user = useAuthStore(state => state.user)

   const isOwner = user?.id === job.requester.id

   return (
      <div className="gap-4 grid grid-cols-12">
         <div className="col-span-9 space-y-4">
            <Card>
               <CardHeader className="flex justify-between">
                  <CategorySection service={job.service} />
                  <div className="flex flex-col items-end">
                     <CreationDateValue createdAt={job.createdAt} />
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
            <LocationSection city={job.city} district={job.district} />
            <DeadlineInfoSection
               deadlineType={job.deadlineType}
               createdAt={job.createdAt}
               deadline={job.deadline}
               exactDate={job.exactDate}
            />
         </div>
         <div className="col-span-3 space-y-4">
            {!isOwner && <RequesterSection requester={job.requester} />}
            <Section label="Akcje">
               <ActionsSection isOwner={isOwner} requestId={job.id} />
            </Section>
         </div>
      </div>
   )
}
