import type { ConversationDto } from "@/features/chat/api/types"
import { Badge } from "@/shared/ui/badge"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"
import { pl } from "date-fns/locale"
import { useNavigate } from "@tanstack/react-router"
import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { getUserInitials } from "@/shared/utils"
import { Briefcase } from "lucide-react"
import { useBreakpoint } from "@/shared/hooks"
import { useChatWindowStore } from "@/features/chat/stores/use-chat-window-store"

export const ConversationItemList = ({ conversation }: { conversation: ConversationDto }) => {
   const { isMobile } = useBreakpoint()
   const openChatWindow = useChatWindowStore(state => state.openWindow)
   const { lastMessage, unreadMessageCount, otherParticipants, context, id } = conversation
   const navigate = useNavigate()
   const isUnread = unreadMessageCount > 0

   const timeAgo = useMemo(() => {
      if (!lastMessage) return ""
      return formatDistanceToNow(new Date(lastMessage.sentAt), {
         locale: pl,
         addSuffix: true,
      })
   }, [lastMessage])

   const handleNavigateToChat = () => {
      if (isMobile) {
         navigate({ to: `/zlecenia/${id}` })
         return
      }

      openChatWindow(id)
   }

   const handleNavigateToJob = (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      navigate({ to: `/zlecenia/${context.id}` })
   }

   return (
      <div
         onClick={handleNavigateToChat}
         className="p-4 hover:bg-accent/50 transition-colors cursor-pointer flex items-center justify-between gap-3"
      >
         <h3 className="flex gap-2">
            {otherParticipants.map(p => (
               <Avatar key={p.id} className="w-12 h-12">
                  <AvatarImage src={p.name} alt={p.name} />
                  <AvatarFallback className="bg-accent">{getUserInitials(p.name)}</AvatarFallback>
               </Avatar>
            ))}
         </h3>
         <div className="flex-1 flex justify-between">
            <div>
               <p className="text-sm capitalize font-semibold truncate">
                  {otherParticipants.map(p => p.name).join(", ")}
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

            <div>
               {lastMessage && (
                  <div>
                     <p className="text-xs text-muted-foreground mt-1">{timeAgo}</p>
                     {isUnread && (
                        <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs">
                           {unreadMessageCount}
                        </Badge>
                     )}
                  </div>
               )}
               <div className="flex flex-col gap-2 items-end">
                  {context.type === "JOB" && (
                     <Badge
                        onClick={handleNavigateToJob}
                        variant="secondary"
                        className="h-10 mt-2 cursor-pointer hover:bg-primary/60"
                     >
                        <Briefcase className="w-3 h-3 mr-1" />
                        Zobacz zlecenie
                     </Badge>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}
