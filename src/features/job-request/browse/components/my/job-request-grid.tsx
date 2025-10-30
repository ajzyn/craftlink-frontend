import type { JobRequestSummaryDto } from "@/features/job-request/browse/types/data"
import { JobRequestCardSkeleton } from "@/features/job-request/browse/components/my/job-request-card-skeleton"
import { JobRequestCard } from "./job-request-card"

interface JobRequestGridProps {
   isLoading: boolean
   jobs?: JobRequestSummaryDto[]
}

export const JobRequestGrid = ({ isLoading, jobs }: JobRequestGridProps) => (
   <div className="grid gap-4 lg:grid-cols-2">
      {isLoading
         ? Array.from({ length: 6 }).map((_, i) => <JobRequestCardSkeleton key={i} />)
         : jobs?.map(job => <JobRequestCard job={job} key={job.id} />)}
   </div>
)
