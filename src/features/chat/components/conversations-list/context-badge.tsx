import { Badge } from "@/shared/ui/badge"
import { Briefcase } from "lucide-react"
import type { ConversationContextDto } from "@/features/chat/api/types"

interface ChatContextBadgeProps {
   context: ConversationContextDto
   onClick: (e: React.MouseEvent<HTMLSpanElement>) => void
}

export const ContextBadge = ({ context, onClick }: ChatContextBadgeProps) => {
   return (
      <div className="flex flex-col gap-2 items-end">
         {context.type === "JOB" && (
            <Badge
               onClick={onClick}
               variant="secondary"
               className="mt-auto h-10 cursor-pointer hover:bg-primary/60"
            >
               <Briefcase className="w-3 h-3 mr-1" />
               Zobacz zlecenie
            </Badge>
         )}
      </div>
   )
}
