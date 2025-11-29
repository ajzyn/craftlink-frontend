import type { JobRequestSummaryDto } from "@/features/job-request/api/types"
import { JobRequestCardSkeleton } from "@/features/job-request/browse/shared/components/job-request-card-skeleton"
import { JobRequestCard } from "./job-request-card"
import { isNil } from "lodash"

interface JobRequestGridProps {
   isLoading: boolean
   jobs?: JobRequestSummaryDto[]
   isFetchingNextPage: boolean
}

export const JobRequestGrid = ({ isLoading, jobs, isFetchingNextPage }: JobRequestGridProps) => {
   if (!isLoading && (isNil(jobs) || jobs?.length === 0)) {
      return null
   }

   const shouldShowNextPageSkeleton = isFetchingNextPage && !isLoading

   return (
      <div className="grid gap-4 xl:grid-cols-2">
         {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <JobRequestCardSkeleton key={i} />)
            : jobs?.map(job => <JobRequestCard job={job} key={job.id} />)}
         {shouldShowNextPageSkeleton &&
            [...Array(6)].map((_, i) => <JobRequestCardSkeleton key={i} />)}
      </div>
   )
}
