import { useEffect } from "react"
import { useSocket } from "@/features/chat/hooks/use-socket"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import type { ConversationMessage } from "@/features/chat/stores/use-conversation-store"

export const useAutoMarkAsRead = (
   conversationId: string,
   messages: ConversationMessage[],
   minimized: boolean,
) => {
   const userId = useAuthStore(state => state.user?.id)
   const { markAsRead } = useSocket(conversationId)

   useEffect(() => {
      if (minimized) return

      const unreadFromOthers = messages.some(msg => !msg.isRead && msg.senderId !== userId)

      if (unreadFromOthers) {
         markAsRead()
      }
   }, [messages, minimized, userId, markAsRead, conversationId])
}
