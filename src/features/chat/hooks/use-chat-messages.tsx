import { useChatHistoryQuery } from "@/features/chat/api/queries"
import { useChatWindowStore } from "@/features/chat/stores/use-chat-window-store"
import { useEffect } from "react"

export const useChatMessages = (conversationId?: string) => {
   const { messages: runtimeMessages, setMessages } = useChatWindowStore()

   const { data: history, isSuccess, isError, isLoading } = useChatHistoryQuery(conversationId)

   useEffect(() => {
      if (isSuccess) {
         setMessages(conversationId!, history?.messages ?? [])
      }
   }, [conversationId, history?.messages, isSuccess, setMessages])

   const allMessages = [...(history?.messages ?? []), ...(runtimeMessages[conversationId!] ?? [])]

   return { isError, isLoading, messages: allMessages }
}
