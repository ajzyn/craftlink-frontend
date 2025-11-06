import { useChatHistoryQuery } from "@/features/chat/api/queries"
import { useChatWindowStore } from "@/features/chat/stores/use-chat-window-store"
import { useEffect, useMemo } from "react"
import { useShallow } from "zustand/react/shallow"

export const useChatMessages = (conversationId?: string) => {
   const { messages: runtimeMessages, setMessages } = useChatWindowStore(
      useShallow(state => ({ messages: state.messages, setMessages: state.setMessages })),
   )

   const { data: chatHistory, isSuccess, isError, isLoading } = useChatHistoryQuery(conversationId)

   useEffect(() => {
      if (isSuccess && conversationId) {
         setMessages(conversationId, chatHistory?.messages ?? [])
      }
   }, [isSuccess, conversationId, chatHistory?.messages, setMessages])

   const allMessages = useMemo(() => {
      return [...(chatHistory?.messages ?? []), ...(runtimeMessages[conversationId!] ?? [])]
   }, [chatHistory?.messages, runtimeMessages, conversationId])

   return { isError, isLoading, messages: allMessages }
}
