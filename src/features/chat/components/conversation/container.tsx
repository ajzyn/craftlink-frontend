import { List } from "@/features/chat/components/conversation/message/list"
import { Input } from "@/features/chat/components/conversation/message/input"
import { useMessages } from "@/features/chat/hooks/use-messages"
import { useAutoMarkAsRead } from "@/features/chat/hooks/use-auto-mark-as-read"
import { useOptimisticReadStatus } from "@/features/chat/hooks/use-optimistic-read-status"
import { useBreakpoint } from "@/shared/hooks"
import { HeaderDesktop } from "@/features/chat/components/conversation/header-desktop"
import { HeaderMobile } from "@/features/chat/components/conversation/header-mobile"
import { useSendMessage } from "@/features/chat/hooks/use-send-message"

interface ChatContainerProps {
   conversationId: string
   minimized?: boolean
}

export const Container = ({ conversationId, minimized = false }: ChatContainerProps) => {
   const { isMobile } = useBreakpoint()
   const { messages, isError } = useMessages(conversationId)
   const sendMessage = useSendMessage(conversationId)
   useAutoMarkAsRead(conversationId, messages, minimized)
   useOptimisticReadStatus(conversationId, minimized)

   return (
      <>
         {isMobile ? (
            <HeaderMobile conversationId={conversationId} />
         ) : (
            <HeaderDesktop conversationId={conversationId} minimized={minimized} />
         )}

         {!minimized && (
            <>
               <div className="flex-1 overflow-hidden px-0">
                  {isError ? (
                     <div className="flex items-center justify-center h-full text-sm text-destructive">
                        Błąd wczytywania wiadomości
                     </div>
                  ) : (
                     <List messages={messages} />
                  )}
               </div>

               <div className="p-2">
                  <Input onSend={sendMessage} />
               </div>
            </>
         )}
      </>
   )
}
