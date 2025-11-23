import { useCallback, useEffect } from "react"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import type {
   ConversationMessageDto,
   ConversationMessageReadDto,
   ConversationWebsocketEvent,
} from "@/features/chat/api/types"
import type { IMessage } from "@stomp/stompjs"
import { wsClient } from "@/shared/api/websocket-client"
import { useEventHandlers } from "@/features/chat/hooks/use-event-handlers"

export const useSocket = (conversationId: string) => {
   const token = useAuthStore(state => state.accessToken)
   const { handleMessageEvent, handleReadEvent } = useEventHandlers(conversationId)

   useEffect(() => {
      void wsClient.acquire(token ?? undefined)
      return () => void wsClient.release()
   }, [token])

   useEffect(() => {
      const handleEvent = (msg: IMessage) => {
         const envelope = JSON.parse(msg.body) as ConversationWebsocketEvent<
            ConversationMessageDto | ConversationMessageReadDto
         >

         switch (envelope.type) {
            case "MESSAGE":
               handleMessageEvent(envelope.payload as ConversationMessageDto)
               break
            case "READ_MESSAGE":
               handleReadEvent(envelope.payload as ConversationMessageReadDto)
               break
         }
      }

      const destination = `/topic/conversations/${conversationId}`
      wsClient.subscribe(destination, handleEvent)

      return () => wsClient.unsubscribe(destination)
   }, [conversationId, handleMessageEvent, handleReadEvent])

   const sendMessage = useCallback(
      (content: string, tempId: string) => {
         if (!conversationId || !content.trim()) return
         wsClient.send(`/app/chat.send/${conversationId}`, JSON.stringify({ content, tempId }))
      },
      [conversationId],
   )

   const markAsRead = useCallback(() => {
      if (!conversationId) return
      wsClient.send(`/app/chat.read/${conversationId}`)
   }, [conversationId])

   return { sendMessage, markAsRead }
}
