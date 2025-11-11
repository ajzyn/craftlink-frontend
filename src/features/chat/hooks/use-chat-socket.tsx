// hooks/use-chat-socket.tsx
import { useCallback, useEffect } from "react"
import { useChatWindowStore } from "../stores/use-chat-window-store"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import type {
   ChatEventEnvelopeDto,
   ChatMessageDto,
   ChatMessageReadDto,
} from "@/features/chat/api/types"
import type { IMessage } from "@stomp/stompjs"
import { wsClient } from "@/shared/api/websocket-client"
import { useShallow } from "zustand/react/shallow"

export const useChatSocket = (conversationId?: string) => {
   const token = useAuthStore(state => state.accessToken)
   const currentUserId = useAuthStore(state => state.user?.id)
   const { addMessage, markMessagesAsRead } = useChatWindowStore(
      useShallow(state => ({
         addMessage: state.addMessage,
         markMessagesAsRead: state.markAllMessagesAsReadUpTo,
      })),
   )

   useEffect(() => {
      void wsClient.acquire(token ?? undefined)
      return () => void wsClient.release()
   }, [token])

   useEffect(() => {
      if (!conversationId || !currentUserId) return

      const destination = `/topic/conversations/${conversationId}`

      const handleEvent = (msg: IMessage) => {
         const envelope = JSON.parse(msg.body) as ChatEventEnvelopeDto<
            ChatMessageDto | ChatMessageReadDto
         >

         switch (envelope.type) {
            case "MESSAGE": {
               const message = envelope.payload as ChatMessageDto
               addMessage(message)
               break
            }
            case "BULK_READ_RECEIPT": {
               const { lastReadMessageId, readAt, readerId, conversationId } =
                  envelope.payload as ChatMessageReadDto
               markMessagesAsRead(
                  conversationId,
                  lastReadMessageId,
                  readAt,
                  readerId,
                  currentUserId,
               )
               break
            }
         }
      }

      wsClient.subscribe(destination, handleEvent)

      return () => {
         wsClient.unsubscribe(destination)
      }
   }, [conversationId, currentUserId, addMessage, markMessagesAsRead])

   const sendMessage = useCallback(
      (content: string) => {
         if (!conversationId || !content.trim()) return
         wsClient.send(`/app/chat.send/${conversationId}`, JSON.stringify({ content }))
      },
      [conversationId],
   )

   const markAsRead = useCallback(() => {
      if (!conversationId) return
      wsClient.send(`/app/chat.read/${conversationId}`)
   }, [conversationId])

   return { sendMessage, markAsRead }
}
