import { useQueryClient } from "@tanstack/react-query"
import { useConversationStore } from "../stores/use-conversation-store"
import { useCallback } from "react"
import { conversationKeys } from "@/features/chat/api/keys"
import type {
   ConversationDto,
   ConversationMessageDto,
   ConversationMessageReadDto,
   UnreadConversationsCountDto,
} from "@/features/chat/api/types"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { useShallow } from "zustand/react/shallow"

export const useEventHandlers = (conversationId: string) => {
   const queryClient = useQueryClient()
   const currentUserId = useAuthStore(state => state.user?.id)
   const { addMessage, markMessagesAsRead, isMinimized } = useConversationStore(
      useShallow(state => ({
         addMessage: state.addMessage,
         markMessagesAsRead: state.markAllMessagesAsReadUpTo,
         isMinimized: state.windows[conversationId]?.minimized,
      })),
   )

   const handleMessageEvent = useCallback(
      (message: ConversationMessageDto) => {
         addMessage(message)

         queryClient.setQueryData(conversationKeys.all, (old: ConversationDto[] | undefined) => {
            if (!old) return old
            return old.map(conv =>
               conv.id === conversationId
                  ? {
                       ...conv,
                       lastMessage: message,
                       unreadMessageCount:
                          currentUserId === message.senderId || isMinimized == false
                             ? 0
                             : conv.unreadMessageCount + 1,
                    }
                  : conv,
            )
         })

         queryClient.setQueryData(
            conversationKeys.unreadCount(),
            (old: UnreadConversationsCountDto | undefined) => {
               if (isMinimized === false) {
                  return {
                     count: 0,
                  }
               }

               if (!old) {
                  return {
                     count: 1,
                  }
               }

               return {
                  count: old.count + 1,
               }
            },
         )
      },
      [addMessage, conversationId, currentUserId, isMinimized, queryClient],
   )

   const handleReadEvent = useCallback(
      (payload: ConversationMessageReadDto) => {
         const { lastReadMessageId, readAt, readerId, conversationId } = payload
         markMessagesAsRead(conversationId, lastReadMessageId, readAt, readerId, currentUserId)
      },
      [markMessagesAsRead, currentUserId],
   )

   return { handleMessageEvent, handleReadEvent }
}
