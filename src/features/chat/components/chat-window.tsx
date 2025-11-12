import { memo } from "react"
import { ChatMessageList } from "@/features/chat/components/chat-message-list"
import { ChatInput } from "@/features/chat/components/chat-input"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/shared/ui/card"
import { useChatSocket } from "@/features/chat/hooks/use-chat-socket"
import { useChatWindowStore } from "@/features/chat/stores/use-chat-window-store"
import { useChatMessages } from "@/features/chat/hooks/use-chat-messages"
import { ChatWindowHeader } from "@/features/chat/components/chat-window-header"
import { useAutoMarkAsRead } from "@/features/chat/hooks/use-auto-mark-as-read"

interface ChatWindowProps {
   conversationId: string
   minimized: boolean
}

export const ChatWindow = memo(({ conversationId, minimized }: ChatWindowProps) => {
   const { messages, isError } = useChatMessages(conversationId)
   const { sendMessage } = useChatSocket(conversationId)
   useAutoMarkAsRead(conversationId, messages, minimized)

   const participants = useChatWindowStore(state => state.windows[conversationId]?.participants)

   return (
      <Card
         className={cn(
            "flex flex-col py-0 shadow-lg rounded-xl overflow-hidden bg-background",
            "transition-all duration-300",
            minimized
               ? "h-12 w-64 cursor-pointer select-none"
               : "h-[500px] w-[350px] sm:h-[600px] sm:w-[400px]",
         )}
      >
         <ChatWindowHeader
            conversationId={conversationId}
            participants={participants}
            minimized={minimized}
         />
         {!minimized && (
            <>
               <CardContent className="px-0 flex flex-col flex-1 overflow-hidden">
                  {isError ? (
                     <div className="flex items-center justify-center h-full text-sm text-destructive">
                        Błąd wczytywania wiadomości
                     </div>
                  ) : (
                     <ChatMessageList participants={participants} messages={messages} />
                  )}
               </CardContent>

               <div className="p-2">
                  <ChatInput onSend={sendMessage} />
               </div>
            </>
         )}
      </Card>
   )
})
