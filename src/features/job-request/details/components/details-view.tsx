import type { JobRequestDetailsDto } from "@/features/job-request/api/types"
import { useBreakpoint } from "@/shared/hooks/use-breakpoint"
import { Container } from "@/components/container"
import { MobileLayout } from "@/features/job-request/details/components/mobile-layout"
import { DesktopLayout } from "@/features/job-request/details/components/desktop-layout"

interface JobRequestDetailsProps {
   job: JobRequestDetailsDto
}

export const DetailsView = ({ job }: JobRequestDetailsProps) => {
   const { isMobile } = useBreakpoint()

   return (
      <Container className="space-y-4">
         {isMobile ? <MobileLayout job={job} /> : <DesktopLayout job={job} />}
      </Container>
   )
}
