import { useCallback, useEffect } from "react"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import type {
   ChatEventEnvelopeDto,
   ChatMessageDto,
   ChatMessageReadDto,
} from "@/features/chat/api/types"
import type { IMessage } from "@stomp/stompjs"
import { wsClient } from "@/shared/api/websocket-client"
import { useChatEventHandlers } from "@/features/chat/hooks/use-chat-event-handlers"

export const useChatSocket = (conversationId: string) => {
   const token = useAuthStore(state => state.accessToken)
   const { handleMessageEvent, handleReadEvent } = useChatEventHandlers(conversationId)

   useEffect(() => {
      void wsClient.acquire(token ?? undefined)
      return () => void wsClient.release()
   }, [token])

   useEffect(() => {
      const handleEvent = (msg: IMessage) => {
         const envelope = JSON.parse(msg.body) as ChatEventEnvelopeDto<
            ChatMessageDto | ChatMessageReadDto
         >

         switch (envelope.type) {
            case "MESSAGE":
               handleMessageEvent(envelope.payload as ChatMessageDto)
               break
            case "READ_MESSAGE":
               handleReadEvent(envelope.payload as ChatMessageReadDto)
               break
         }
      }

      const destination = `/topic/conversations/${conversationId}`
      wsClient.subscribe(destination, handleEvent)

      return () => wsClient.unsubscribe(destination)
   }, [conversationId, handleMessageEvent, handleReadEvent])

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
