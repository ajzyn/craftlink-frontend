import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobRequestStatus } from "@/features/job-request/shared/types/job-request-status-enum"

export const MyJobRequestFilters = () => {
   return (
      <TabsList>
         <TabsTrigger value="all">Wszyskie</TabsTrigger>
         <TabsTrigger value={JobRequestStatus.ACTIVE}>Aktywne</TabsTrigger>
         <TabsTrigger value={JobRequestStatus.COMPLETED}>Zakończone</TabsTrigger>
         <TabsTrigger value={JobRequestStatus.CANCELLED}>Anulowane</TabsTrigger>
      </TabsList>
   )
}
