import { useEffect } from "react"
import { useChatSocket } from "@/features/chat/hooks/use-chat-socket"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import type { ChatMessageDto } from "@/features/chat/api/types"

export const useAutoMarkAsRead = (
   conversationId: string,
   messages: ChatMessageDto[],
   minimized: boolean,
) => {
   const userId = useAuthStore(state => state.user?.id)
   const { markAsRead } = useChatSocket(conversationId)

   useEffect(() => {
      if (minimized) return

      const unreadFromOthers = messages.some(msg => !msg.isRead && msg.senderId !== userId)

      if (unreadFromOthers) {
         markAsRead()
      }
   }, [messages, minimized, userId, markAsRead, conversationId])
}
