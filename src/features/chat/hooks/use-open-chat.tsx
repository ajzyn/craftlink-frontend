import { useQueryClient } from "@tanstack/react-query"
import { useChatWindowStore } from "../stores/use-chat-window-store"
import { chatKeys } from "@/features/chat/api/keys"
import type { ConversationDto } from "@/features/chat/api/types"

export const useOpenChat = () => {
   const queryClient = useQueryClient()
   const openWindow = useChatWindowStore(state => state.openWindow)

   return async (conversationId: string) => {
      openWindow(conversationId)
      queryClient.setQueryData(chatKeys.all, (old: ConversationDto[] | undefined) => {
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
   }
}
