import type { ConversationMessageDto } from "@/features/chat/api/types"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { useScroll } from "@/features/chat/hooks/use-scroll"
import { Item } from "@/features/chat/components/conversation/message/item"

interface ConversationMessageListProps {
   messages: ConversationMessageDto[]
}

export const List = ({ messages }: ConversationMessageListProps) => {
   const userId = useAuthStore(state => state.user?.id)
   const { scrollRef, handleScroll } = useScroll(messages)

   return (
      <div
         ref={scrollRef}
         onScroll={handleScroll}
         className="flex flex-col gap-2 p-3 overflow-y-auto h-full"
      >
         {messages.map(msg => (
            <Item key={msg.id} message={msg} isOwn={userId === msg.senderId} />
         ))}
      </div>
   )
}
