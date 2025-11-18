import { useEffect } from "react"
import { conversationKeys } from "@/features/chat/api/keys"
import type { ConversationDto, UnreadConversationsCountDto } from "@/features/chat/api/types"
import { useQueryClient } from "@tanstack/react-query"
import { useConversationStore } from "@/features/chat/stores/use-conversation-store"

export const useOptimisticReadStatus = (conversationId: string, minimized: boolean) => {
   const queryClient = useQueryClient()
   const isOpen = useConversationStore(state => state.windows[conversationId]?.isOpen ?? false)

   useEffect(() => {
      if (minimized || !isOpen) return

      queryClient.setQueryData(conversationKeys.all, (old: ConversationDto[] | undefined) => {
         if (!old) return old
         return old.map(conv =>
            conv.id === conversationId
               ? {
                    ...conv,
                    unreadMessageCount: 0,
                 }
               : conv,
         )
      })

      queryClient.setQueryData(
         conversationKeys.unreadCount(),
         (old: UnreadConversationsCountDto | undefined) => {
            if (!old || old.count === 0) {
               return {
                  count: 0,
               }
            }
            return {
               count: old.count - 1,
            }
         },
      )
   }, [minimized, isOpen, conversationId, queryClient])
}
