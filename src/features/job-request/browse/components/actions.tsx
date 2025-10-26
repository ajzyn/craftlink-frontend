import { Button } from "@/components/ui/button"
import { Heart, Send, Share2 } from "lucide-react"
import { useJobRequestActions } from "@/features/job-request/browse/hooks/use-job-request-actions"

interface JobRequestDetailsActionListProps {
   requestId: string
}

export const JobRequestDetailsActionList = ({ requestId }: JobRequestDetailsActionListProps) => {
   const { onSave, onShare, onApply } = useJobRequestActions(requestId)

   return (
      <div className="grid grid-cols-2 gap-2 md:flex md:flex-col max-w-sm mx-auto">
         <Button variant="default" onClick={onApply} className="col-span-2 flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span>Wyślij ofertę</span>
         </Button>

         <Button variant="secondary" onClick={onSave} className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span>Zapisz zlecenie</span>
         </Button>

         <Button variant="secondary" onClick={onShare} className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span>Udostępnij</span>
         </Button>
      </div>
   )
}
