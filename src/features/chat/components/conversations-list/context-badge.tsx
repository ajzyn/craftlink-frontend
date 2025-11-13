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
               className="mt-auto h-10 cursor-pointer transition-colors hover:bg-primary/40 max-md:bg-primary/10 "
            >
               <Briefcase className="w-3 h-3 md:mr-1" />
               <span className="hidden md:inline-block">Zobacz zlecenie</span>
            </Badge>
         )}
      </div>
   )
}
