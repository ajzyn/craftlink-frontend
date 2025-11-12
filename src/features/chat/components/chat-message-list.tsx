import type { ChatMessageDto, ChatParticipantDto } from "@/features/chat/api/types"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { cn } from "@/lib/utils"
import { getFormattedDateTime } from "@/shared/utils"
import { CheckCheck } from "lucide-react"
import { useChatScroll } from "@/features/chat/hooks/use-chat-scroll"

interface ChatMessageListProps {
   messages: ChatMessageDto[]
   participants: ChatParticipantDto[]
}

export const ChatMessageList = ({ messages }: ChatMessageListProps) => {
   const userId = useAuthStore(state => state.user?.id)
   const { scrollRef, handleScroll } = useChatScroll(messages)

   return (
      <div
         ref={scrollRef}
         onScroll={handleScroll}
         className="flex flex-col gap-2 p-3 overflow-y-auto h-full"
      >
         {messages.map(msg => (
            <div
               key={msg.sentAt + msg.senderId}
               className={cn(
                  "flex flex-col w-3/4 gap-1 rounded-md pl-3 pr-2 py-1",
                  userId === msg.senderId
                     ? "bg-primary/30 self-end"
                     : "bg-secondary brightness-95 self-start",
               )}
            >
               <span className="flex justify-end items-center gap-2 text-sm text-gray-500">
                  <span>{getFormattedDateTime(msg.sentAt)}</span>

                  {userId === msg.senderId && (
                     <CheckCheck
                        className={cn("w-3 h-3", msg.isRead ? "text-blue-500" : "text-gray-500")}
                     />
                  )}
               </span>
               <span className="">{msg.content}</span>
            </div>
         ))}
      </div>
   )
}
