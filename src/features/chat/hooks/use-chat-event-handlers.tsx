import { useQueryClient } from "@tanstack/react-query"
import { useChatWindowStore } from "../stores/use-chat-window-store"
import { useCallback } from "react"
import { chatKeys } from "@/features/chat/api/keys"
import type { ChatMessageDto, ChatMessageReadDto, ConversationDto } from "../api/types"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { useShallow } from "zustand/react/shallow"

export const useChatEventHandlers = (conversationId: string) => {
   const queryClient = useQueryClient()
   const currentUserId = useAuthStore(state => state.user?.id)
   const { addMessage, markMessagesAsRead, isMinimized } = useChatWindowStore(
      useShallow(state => ({
         addMessage: state.addMessage,
         markMessagesAsRead: state.markAllMessagesAsReadUpTo,
         isMinimized: state.windows[conversationId].minimized,
      })),
   )

   const handleMessageEvent = useCallback(
      (message: ChatMessageDto) => {
         addMessage(message)

         queryClient.setQueryData(chatKeys.all, (old: ConversationDto[] | undefined) => {
            if (!old) return old
            return old.map(conv =>
               conv.id === conversationId
                  ? {
                       ...conv,
                       lastMessage: message,
                       unreadMessageCount:
                          currentUserId === message.senderId || !isMinimized
                             ? 0
                             : conv.unreadMessageCount + 1,
                    }
                  : conv,
            )
         })
      },
      [addMessage, conversationId, currentUserId, isMinimized, queryClient],
   )

   const handleReadEvent = useCallback(
      (payload: ChatMessageReadDto) => {
         const { lastReadMessageId, readAt, readerId, conversationId } = payload
         markMessagesAsRead(conversationId, lastReadMessageId, readAt, readerId, currentUserId)
      },
      [markMessagesAsRead, currentUserId],
   )

   return { handleMessageEvent, handleReadEvent }
}
