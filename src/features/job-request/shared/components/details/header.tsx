import type { JobRequestDetailsDto } from "@/features/job-request/shared/types/job-request-details"
import { useBreakpoint } from "@/shared/hooks/use-breakpoint"
import { CreationDate } from "@/features/job-request/shared/components/details/creation-date"
import { JobRequestCategory } from "@/features/job-request/shared/components/details/category"
import { JobRequestStatusBadge } from "@/features/job-request/shared/components/status-badge"

interface JobRequestHeaderProps {
   job: JobRequestDetailsDto
   isOwner: boolean
}

export const JobRequestHeader = ({ job, isOwner }: JobRequestHeaderProps) => {
   const { isMobile } = useBreakpoint()

   if (isMobile) {
      return (
         <div className="space-y-2">
            <JobRequestStatusBadge status={job.status} isOwner={isOwner} />
            <CreationDate createdAt={job.createdAt} />
            <JobRequestCategory service={job.service} />
         </div>
      )
   }

   return (
      <div className="flex items-start justify-between">
         <JobRequestCategory service={job.service} />
         <div className="flex flex-col items-end">
            <CreationDate createdAt={job.createdAt} />
            <JobRequestStatusBadge status={job.status} isOwner={isOwner} />
         </div>
      </div>
   )
}
