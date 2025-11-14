import type { JobRequestDetailsDto } from "@/features/job-request/api/types"
import { JobRequestStatusBadge } from "@/features/job-request/shared/components/status-badge"
import { CreationDateValue } from "@/features/job-request/details/components/creation-date-value"
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import { CategorySection } from "@/features/job-request/details/components/category-section"
import { ActionsSection } from "@/features/job-request/details/components/actions-section"
import { LocationSection } from "@/features/job-request/details/components/location-section"
import { DeadlineInfoSection } from "@/features/job-request/details/components/deadline-info-section"
import { RequesterSection } from "@/features/job-request/details/components/requester-section"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"

interface JobRequestMobileLayoutProps {
   job: JobRequestDetailsDto
}

export const MobileLayout = ({ job }: JobRequestMobileLayoutProps) => {
   const user = useAuthStore(state => state.user)
   const isOwner = user?.id === job.requester.id

   return (
      <>
         <div className="flex flex-col gap-2 items-end">
            <JobRequestStatusBadge status={job.status} requesterId={job.requester.id} />
            <CreationDateValue createdAt={job.createdAt} />
         </div>
         <div className="flex flex-col gap-4 mb-30">
            <Card>
               <CardHeader>
                  <h2 className="text-heading-lg">Kategoria</h2>
               </CardHeader>
               <CardContent>
                  <CategorySection service={job.service} />
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
            <LocationSection city={job.city} district={job.district} />
            <DeadlineInfoSection
               deadlineType={job.deadlineType}
               createdAt={job.createdAt}
               deadline={job.deadline}
               exactDate={job.exactDate}
            />
            {!isOwner && <RequesterSection requester={job.requester} />}
         </div>
         <div className="fixed left-0 w-full bottom-0 py-3 bg-secondary">
            <ActionsSection requestId={job.id} isOwner={isOwner} />
         </div>
      </>
   )
}
