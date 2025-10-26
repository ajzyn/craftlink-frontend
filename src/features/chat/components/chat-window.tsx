import { useChatWindowStore } from "@/features/chat/stores/use-chat-window-store"
import { ChatWindowInner } from "@/features/chat/components/chat-window-inner"
import { isNil } from "lodash"

export const ChatWindow = () => {
   const { activeConversationId, isOpen } = useChatWindowStore()

   if (!isOpen || isNil(activeConversationId)) return null

   return <ChatWindowInner conversationId={activeConversationId} />
}
