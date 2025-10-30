import type { JobRequestSummaryDto } from "@/features/job-request/browse/types/data"
import { Container } from "@/components/container"
import { JobRequestListHero } from "@/features/job-request/browse/components/my/job-request-list-hero"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobRequestStatus } from "@/features/job-request/shared/types/job-request-status-enum"
import { useNavigate } from "@tanstack/react-router"
import { EmptyState } from "@/components/empty-state"
import { JobRequestGrid } from "@/features/job-request/browse/components/my/job-request-grid"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MyJobRequestsProps {
   jobs?: JobRequestSummaryDto[]
   selectedStatus?: JobRequestStatus
   isLoading: boolean
   isFetchingNextPage: boolean
}

export const MyJobRequests = ({
   jobs,
   selectedStatus,
   isLoading,
   isFetchingNextPage,
}: MyJobRequestsProps) => {
   const navigate = useNavigate({ from: "/zlecenia/moje" })
   const tabValue = selectedStatus ?? "all"

   const handleOnTabChange = (value: string) => {
      const newStatus = value === "all" ? undefined : (value as JobRequestStatus)
      navigate({
         search: (prev: { status?: JobRequestStatus }) => ({ ...prev, status: newStatus }),
      })
   }

   const handleCreateNewJob = () => {
      console.log("creating new job") //TODO: redirection
   }

   const isListEmpty = !isLoading && jobs?.length === 0

   return (
      <Container>
         <JobRequestListHero
            description="Przeglądaj swoje aktywne i zakończone zlecenia. Sprawdź status, oferty i szczegóły."
            title="Twoje zlecenia"
         />
         <Tabs value={tabValue} onValueChange={handleOnTabChange}>
            <TabsList className="h-12 space-x-2 bg-primary/5">
               <TabsTrigger value="all">Wszystkie</TabsTrigger>
               <TabsTrigger value={JobRequestStatus.ACTIVE}>Aktywne</TabsTrigger>
               <TabsTrigger value={JobRequestStatus.COMPLETED}>Zakończone</TabsTrigger>
               <TabsTrigger value={JobRequestStatus.CANCELLED}>Anulowane</TabsTrigger>
            </TabsList>
            <div className="my-12">
               {isListEmpty ? (
                  <EmptyState
                     title="Brak zleceń"
                     description="Nie masz jeszcze żadnych zleceń. Zacznij od stworzenia swojego pierwszego zlecenia i znajdź
         zaufanych specjalistów."
                  >
                     <Button className="flex mx-auto mt-8" onClick={handleCreateNewJob}>
                        <Plus className="h-5 w-5 mr-2" />
                        Dodaj nowe zlecenie
                     </Button>
                  </EmptyState>
               ) : (
                  <JobRequestGrid
                     isFetchingNextPage={isFetchingNextPage}
                     isLoading={isLoading}
                     jobs={jobs}
                  />
               )}
            </div>
         </Tabs>
      </Container>
   )
}
