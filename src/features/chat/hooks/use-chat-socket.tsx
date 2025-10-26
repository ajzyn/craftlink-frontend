import { useEffect, useRef } from "react"
import { useChatWindowStore } from "../stores/use-chat-window-store"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { getChatClient } from "@/features/chat/api/websocket-client"
import type { Client, StompSubscription } from "@stomp/stompjs"
import type { ChatMessage } from "@/features/chat/types/chat"

export const useChatSocket = (conversationId?: string) => {
   const { accessToken: token } = useAuthStore()
   const { addMessage, activeConversationId } = useChatWindowStore()
   const wsClientRef = useRef<Client | null>(null)
   const subRef = useRef<StompSubscription | null>(null)

   useEffect(() => {
      if (!token) return
      wsClientRef.current = getChatClient(token)
   }, [token])

   useEffect(() => {
      const client = wsClientRef.current
      if (!client || !token || !conversationId) return

      const subscribeNow = () => {
         subRef.current?.unsubscribe()
         subRef.current = client.subscribe(`/topic/conversations/${conversationId}`, msg => {
            const body = JSON.parse(msg.body) as ChatMessage
            addMessage(conversationId, body)
         })
      }

      if (client.connected) {
         subscribeNow()
      } else {
         client.onConnect = subscribeNow
      }

      return () => {
         subRef.current?.unsubscribe()
         subRef.current = null
      }
   }, [conversationId, token, addMessage])

   const sendMessage = (content: string) => {
      const client = wsClientRef.current
      if (!conversationId || !client || !content.trim()) return

      client.publish({
         destination: `/app/chat.send/${conversationId}`,
         body: JSON.stringify({ content }),
      })
   }

   return { sendMessage, activeConversationId }
}
