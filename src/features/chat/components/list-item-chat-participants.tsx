import type { ChatParticipantDto } from "@/features/chat/api/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { getUserInitials } from "@/shared/utils"

interface ListItemChatParticipantsProps {
   participants: ChatParticipantDto[]
}

export const ListItemChatParticipants = ({ participants }: ListItemChatParticipantsProps) => {
   return (
      <div className="flex -space-x-2">
         {participants.map(p => (
            <Avatar key={p.id} className="w-12 h-12">
               <AvatarImage src={p.name} alt={p.name} />
               <AvatarFallback className="bg-accent">{getUserInitials(p.name)}</AvatarFallback>
            </Avatar>
         ))}
      </div>
   )
}
