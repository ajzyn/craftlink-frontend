import type { ConversationParticipantDto } from "@/features/chat/api/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { getUserInitials } from "@/shared/utils"

interface ListItemChatParticipantsProps {
   participants: ConversationParticipantDto[]
}

export const ParticipantsAvatars = ({ participants }: ListItemChatParticipantsProps) => {
   return (
      <div className="flex -space-x-2">
         {participants.map(p => (
            <Avatar key={p.id} className="w-12 h-12 md:h-20 md:w-20">
               <AvatarImage src={p.name} alt={p.name} />
               <AvatarFallback className="bg-accent">{getUserInitials(p.name)}</AvatarFallback>
            </Avatar>
         ))}
      </div>
   )
}
