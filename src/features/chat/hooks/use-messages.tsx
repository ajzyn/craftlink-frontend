import { useConversationHistoryQuery } from "@/features/chat/api/queries"
import {
   type ConversationMessage,
   useConversationStore,
} from "@/features/chat/stores/use-conversation-store"
import { useEffect } from "react"
import { useShallow } from "zustand/react/shallow"

export const useMessages = (conversationId: string) => {
   const { setConversation, messages } = useConversationStore(
      useShallow(state => ({
         messages: state.messages[conversationId],
         setConversation: state.setConversation,
      })),
   )

   const { data, isSuccess, isError, isLoading } = useConversationHistoryQuery(conversationId)

   useEffect(() => {
      if (isSuccess && conversationId) {
         const messages: ConversationMessage[] =
            data?.messages.map(msg => ({ ...msg, isPending: false })) ?? []

         setConversation(conversationId, data?.participants ?? [], messages)
      }
   }, [isSuccess, conversationId, setConversation, data])

   return { isError, isLoading, isSuccess, messages: messages ?? [] }
}
