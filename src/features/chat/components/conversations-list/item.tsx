import type { ConversationDto } from "@/features/chat/api/types"
import { Badge } from "@/shared/ui/badge"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { pl } from "date-fns/locale"
import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { useConversationNavigation } from "@/features/chat/hooks/use-navigation"
import { Participants } from "@/features/chat/components/conversations-list/participants"
import { ContextBadge } from "./context-badge"

export const Item = ({ conversation }: { conversation: ConversationDto }) => {
   const { lastMessage, unreadMessageCount, otherParticipants, context, id } = conversation
   const { openConversation, navigateToContext } = useConversationNavigation(id)
   const isUnread = unreadMessageCount > 0

   const timeAgo = useMemo(() => {
      if (!lastMessage) return ""
      return formatDistanceToNow(new Date(lastMessage.sentAt), {
         locale: pl,
         addSuffix: true,
      })
   }, [lastMessage])

   const participantNames = useMemo(
      () => otherParticipants.map(p => p.name).join(", "),
      [otherParticipants],
   )

   return (
      <div
         onClick={openConversation}
         className="p-4 hover:bg-accent/50 transition-colors cursor-pointer flex items-center justify-between gap-6"
      >
         <Participants participants={otherParticipants} />
         <div className="flex-1 flex justify-between items-center">
            <div>
               <p className="text-sm capitalize font-semibold truncate">
                  {participantNames}
                  {isUnread && (
                     <Badge variant="default" className="ml-2 h-5 min-w-5 px-1 text-xs">
                        {unreadMessageCount}
                     </Badge>
                  )}
               </p>
               <p
                  className={cn(
                     "text-sm text-muted-foreground truncate",
                     isUnread && "font-semibold",
                  )}
               >
                  {lastMessage?.content ?? "Brak wiadomości"}
               </p>
            </div>

            <div className="flex flex-col">
               {lastMessage && <p className="text-xs text-muted-foreground mt-1 mb-2">{timeAgo}</p>}
               <ContextBadge onClick={navigateToContext(context.id)} context={context} />
            </div>
         </div>
      </div>
   )
}
