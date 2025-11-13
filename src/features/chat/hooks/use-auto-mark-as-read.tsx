import { useEffect } from "react"
import { useSocket } from "@/features/chat/hooks/use-socket"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import type { ConversationMessageDto } from "@/features/chat/api/types"

export const useAutoMarkAsRead = (
   conversationId: string,
   messages: ConversationMessageDto[],
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
