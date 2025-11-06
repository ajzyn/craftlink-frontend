// use-chat-socket.tsx
import { useCallback, useEffect } from "react"
import { useChatWindowStore } from "../stores/use-chat-window-store"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import type { ChatMessage } from "@/features/chat/api/types"
import type { IMessage } from "@stomp/stompjs"
import { wsClient } from "@/shared/api/websocket-client"

export const useChatSocket = (conversationId?: string) => {
   const token = useAuthStore(state => state.accessToken)
   const addMessage = useChatWindowStore(state => state.addMessage)
   const activeConversationId = useChatWindowStore(state => state.activeConversationId)

   useEffect(() => {
      void wsClient.acquire(token ?? undefined)

      return () => {
         void wsClient.release()
      }
   }, [])

   useEffect(() => {
      if (!conversationId) return

      const handleMessage = (msg: IMessage) => {
         const body = JSON.parse(msg.body) as ChatMessage
         addMessage(conversationId, body)
      }

      wsClient.subscribe(conversationId, handleMessage)

      return () => {
         wsClient.unsubscribe(conversationId)
      }
   }, [conversationId, addMessage])

   const sendMessage = useCallback(
      (content: string) => {
         if (!conversationId || !content.trim()) return
         wsClient.send(conversationId, content)
      },
      [conversationId],
   )

   return { sendMessage, activeConversationId }
}
