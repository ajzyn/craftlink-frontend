import { Badge } from "@/shared/components/ui/badge"
import { JobRequestStatus } from "../types/status-enum"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"

interface JobRequestStatusProps {
   status: JobRequestStatus
   requesterId?: string
}

export const JobRequestStatusBadge = ({ status, requesterId }: JobRequestStatusProps) => {
   const user = useAuthStore(state => state.user)
   const isOwner = user?.id === requesterId

   const getBadgeVariant = () => {
      if (isOwner) {
         if (status === JobRequestStatus.CANCELLED) {
            return "destructive"
         }

         return "success"
      }

      if (status === JobRequestStatus.ACTIVE) {
         return "success"
      }
      if (status === JobRequestStatus.CANCELLED) {
         return "destructive"
      }
      return "success"
   }

   const getBadgeText = () => {
      if (isOwner) {
         if (status === JobRequestStatus.ACTIVE) {
            return "Zlecenie aktywne"
         }

         return "Zlecenie nieaktywne"
      }

      if (status === JobRequestStatus.ACTIVE) {
         return "Zlecenie aktywne"
      }
      if (status === JobRequestStatus.CANCELLED) {
         return "Zlecenie anulowane"
      }
      if (status === JobRequestStatus.COMPLETED) {
         return "Zlecenie zakończone"
      }
   }

   return <Badge variant={getBadgeVariant()}>{getBadgeText()}</Badge>
}
