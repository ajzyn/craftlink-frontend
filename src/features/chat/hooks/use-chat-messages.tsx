import { useChatHistoryQuery } from "@/features/chat/api/queries"
import { useChatWindowStore } from "@/features/chat/stores/use-chat-window-store"
import { useEffect } from "react"
import { useShallow } from "zustand/react/shallow"

export const useChatMessages = (conversationId: string) => {
   const { setConversation, messages } = useChatWindowStore(
      useShallow(state => ({
         messages: state.messages[conversationId],
         setConversation: state.setConversation,
      })),
   )

   const { data, isSuccess, isError, isLoading } = useChatHistoryQuery(conversationId)

   useEffect(() => {
      if (isSuccess && conversationId) {
         setConversation(conversationId, data?.participants ?? [], data?.messages ?? [])
      }
   }, [isSuccess, conversationId, setConversation, data])

   return { isError, isLoading, isSuccess, messages: messages ?? [] }
}
