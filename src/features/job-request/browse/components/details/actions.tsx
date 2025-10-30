import { Button } from "@/components/ui/button"
import { Heart, Send, Share2 } from "lucide-react"
import { useJobRequestActions } from "@/features/job-request/browse/hooks/use-job-request-actions"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"

interface JobRequestDetailsActionListProps {
   requestId: string
   isOwner: boolean
}

export const JobRequestDetailsActionList = ({
   requestId,
   isOwner,
}: JobRequestDetailsActionListProps) => {
   const user = useAuthStore(state => state.user)
   const { handleShare, handleApply, handleToggleSave, handleComplete, handleDelete, isApplying } =
      useJobRequestActions(requestId)

   const renderUserActions = () => {
      return !isOwner ? (
         <>
            <Button
               disabled={isApplying}
               variant="default"
               onClick={handleApply}
               className="col-span-2 flex items-center gap-2"
            >
               <Send className="h-4 w-4" />
               <span>Wyślij ofertę</span>
            </Button>

            <Button
               variant="secondary"
               onClick={handleToggleSave}
               className="flex items-center gap-2"
            >
               <Heart className="h-4 w-4" />
               <span>Zapisz zlecenie</span>
            </Button>
         </>
      ) : (
         <>
            <Button
               variant="default"
               onClick={handleComplete}
               className="col-span-2 flex items-center gap-2"
            >
               <Send className="h-4 w-4" />
               <span>Zlecenie zrealizowane</span>
            </Button>

            <Button
               variant="destructive"
               onClick={handleDelete}
               className="flex items-center gap-2"
            >
               <Heart className="h-4 w-4" />
               <span>Usuń</span>
            </Button>
         </>
      )
   }

   return (
      <div className="grid grid-cols-2 gap-2 md:flex md:flex-col max-w-sm mx-auto">
         {user && renderUserActions()}

         <Button variant="secondary" onClick={handleShare} className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span>Udostępnij</span>
         </Button>
      </div>
   )
}
