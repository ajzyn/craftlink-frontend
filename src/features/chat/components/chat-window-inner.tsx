import { useChat } from "@/features/chat/hooks/use-chat"
import { ChatMessageList } from "@/features/chat/components/chat-message-list"
import { ChatInput } from "@/features/chat/components/chat-input"
import { useChatMessages } from "@/features/chat/hooks/use-chat-messages"

interface ChatWindowInnerProps {
   conversationId: string
}

export const ChatWindowInner = ({ conversationId }: ChatWindowInnerProps) => {
   const { messages, isError, isLoading } = useChatMessages(conversationId)
   const { sendMessage } = useChat(conversationId)

   if (isLoading) return <div>Ładowanie czatu...</div>

   //TODO: skeleton + error handler
   return (
      <div className="flex flex-col h-full bg-background border rounded-md">
         {isError && "Błąd wczytywania historii wiadomosci"}
         <header className="flex justify-between items-center p-3 border-b">
            <h3 className="font-semibold">Czat</h3>
            <button onClick={close}>✖</button>
         </header>
         <ChatMessageList messages={messages} />
         <ChatInput onSend={sendMessage} />
      </div>
   )
}
