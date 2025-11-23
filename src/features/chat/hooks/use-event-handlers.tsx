import { useQueryClient } from "@tanstack/react-query"
import { useConversationStore } from "../stores/use-conversation-store"
import { useCallback } from "react"
import { conversationKeys } from "@/features/chat/api/keys"
import type {
   ConversationDto,
   ConversationMessageDto,
   UnreadConversationsCountDto,
} from "@/features/chat/api/types"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { useShallow } from "zustand/react/shallow"
import type { ConversationMessageReadWS, ConversationMessageWS } from "@/features/chat/types/chat"

export const useEventHandlers = (conversationId: string) => {
   const queryClient = useQueryClient()
   const currentUserId = useAuthStore(state => state.user?.id)
   const { addMessage, markMessagesAsRead, isMinimized, confirmMessage } = useConversationStore(
      useShallow(state => ({
         addMessage: state.addMessage,
         markMessagesAsRead: state.markAllMessagesAsReadUpTo,
         isMinimized: state.windows[conversationId]?.minimized,
         confirmMessage: state.confirmMessage,
      })),
   )

   const addMessageFromOthers = useCallback(
      (message: ConversationMessageWS) => {
         addMessage(message)

         queryClient.setQueryData(conversationKeys.all, (old: ConversationDto[] | undefined) => {
            if (!old) return old

            const { tempId, ...rest } = message
            const msg: ConversationMessageDto = {
               ...rest,
               isRead: false,
            }

            return old.map(conv =>
               conv.id === conversationId
                  ? {
                       ...conv,
                       lastMessage: msg,
                       unreadMessageCount: !isMinimized ? 0 : conv.unreadMessageCount + 1,
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
            },
         )
      },
      [addMessage, queryClient, conversationId, isMinimized],
   )

   const handleMessageEvent = useCallback(
      (message: ConversationMessageWS) => {
         if (message.senderId === currentUserId && message.tempId) {
            confirmMessage(message)
         } else {
            addMessageFromOthers(message)
         }
      },
      [addMessageFromOthers, confirmMessage, currentUserId],
   )

   const handleReadEvent = useCallback(
      (payload: ConversationMessageReadWS) => {
         const { lastReadMessageId, readAt, readerId, conversationId } = payload
         markMessagesAsRead(conversationId, lastReadMessageId, readAt, readerId, currentUserId)
      },
      [markMessagesAsRead, currentUserId],
   )

   return { handleMessageEvent, handleReadEvent }
}
