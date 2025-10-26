import type { JobRequestDetailsDto } from "@/features/job-request/browse/types/data"
import { JobRequestNavigation } from "@/features/job-request/browse/components/navigation/navigation"
import { useBreakpoint } from "@/shared/hooks/use-breakpoint"
import { Container } from "@/components/container"
import { JobRequestMobileLayout } from "@/features/job-request/browse/components/mobile"
import { JobRequestDesktopLayout } from "@/features/job-request/browse/components/desktop"

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
