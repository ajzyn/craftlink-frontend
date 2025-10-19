import type { JobRequestDetailsDto } from "@/features/job-request/shared/types/job-request-details"
import { JobRequestNavigation } from "../navigation/navigation"
import { useBreakpoint } from "@/shared/hooks/use-breakpoint"
import { Container } from "@/components/container"
import { JobRequestMobileLayout } from "@/features/job-request/shared/components/details/mobile"
import { JobRequestDesktopLayout } from "@/features/job-request/shared/components/details/desktop"

interface JobRequestDetailsProps {
   job: JobRequestDetailsDto
}

export const JobRequestDetails = ({ job }: JobRequestDetailsProps) => {
   const { isMobile } = useBreakpoint()

   return (
      <Container className="space-y-4">
         <JobRequestNavigation />

         {isMobile ? <JobRequestMobileLayout job={job} /> : <JobRequestDesktopLayout job={job} />}
      </Container>
   )
}
