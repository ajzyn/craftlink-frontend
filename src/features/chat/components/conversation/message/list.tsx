import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { useAutoScroll } from "@/features/chat/hooks/use-auto-scroll"
import { Item } from "@/features/chat/components/conversation/message/item"
import type { ConversationMessage } from "@/features/chat/stores/use-conversation-store"

interface ConversationMessageListProps {
   messages: ConversationMessage[]
}

export const List = ({ messages }: ConversationMessageListProps) => {
   const userId = useAuthStore(state => state.user?.id)
   const { scrollRef, handleScroll } = useAutoScroll(messages)

   return (
      <div
         ref={scrollRef}
         onScroll={handleScroll}
         className="flex flex-col gap-2 p-3 overflow-y-auto h-full"
      >
         {messages.map(msg => (
            <Item key={msg.id ?? msg.tempId} message={msg} isOwn={userId === msg.senderId} />
         ))}
      </div>
   )
}
