import { useEffect, useRef } from "react"
import { useChatWindowStore } from "../stores/use-chat-window-store"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import type { ChatMessage } from "@/features/chat/types/chat"
import { getChatClient } from "@/features/chat/api/websocket-client"

export const useChat = (conversationId?: string) => {
   const { accessToken: token } = useAuthStore()
   const { addMessage, activeConversationId } = useChatWindowStore()
   const wsClientRef = useRef<ReturnType<typeof getChatClient> | null>(null)

   useEffect(() => {
      if (!conversationId || !token) return

      const client = getChatClient()
      wsClientRef.current = client

      const subscription = client.subscribe(
         `/topic/conversations/${conversationId}`,
         msg => {
            const body = JSON.parse(msg.body) as ChatMessage
            addMessage(conversationId, body)
         },
         { Authorization: `Bearer ${token}` },
      )

      return () => subscription.unsubscribe()
   }, [conversationId, token, addMessage])

   const sendMessage = (content: string) => {
      if (!conversationId || !wsClientRef.current || !content) return

      wsClientRef.current.publish({
         destination: `/app/chat.send/${conversationId}`,
         headers: { Authorization: `Bearer ${token}` },
         body: JSON.stringify({ content }),
      })
   }

   return { sendMessage, activeConversationId }
}
