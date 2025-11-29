import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { useSocket } from "@/features/chat/hooks/use-socket"
import { useConversationStore } from "@/features/chat/stores/use-conversation-store"
import { useCallback } from "react"

export const useSendMessage = (conversationId: string) => {
   const addOptimisticMessage = useConversationStore(state => state.addOptimisticMessage)
   const { sendMessage: sendViaWebSocket } = useSocket(conversationId)
   const currentUserId = useAuthStore(state => state.user?.id)

   return useCallback(
      (content: string) => {
         const tempId = crypto.randomUUID()

         addOptimisticMessage({
            senderId: currentUserId,
            content,
            conversationId,
            tempId,
         })

         sendViaWebSocket(content, tempId)
      },
      [addOptimisticMessage, currentUserId, conversationId, sendViaWebSocket],
   )
}
