import { create } from "zustand"
import type { ChatMessageDto, ChatParticipantDto } from "@/features/chat/api/types"

interface ChatWindow {
   id: string
   isOpen: boolean
   minimized: boolean
   unreadCount: number
   participants: ChatParticipantDto[]
}

interface ChatState {
   messages: Record<string, ChatMessageDto[]>
   windows: Record<string, ChatWindow>
}

interface ChatActions {
   addMessage: (message: ChatMessageDto) => void
   setConversation: (
      conversationId: string,
      participants: ChatParticipantDto[],
      messages: ChatMessageDto[],
   ) => void
   markAllMessagesAsReadUpTo: (
      conversationId: string,
      lastMessageId: string,
      readAt: string,
      readerId: string,
      currentUserId?: string,
   ) => void
   openWindow: (id: string) => void
   minimizeWindow: (id: string) => void
   closeWindow: (id: string) => void
}

export const useChatWindowStore = create<ChatState & ChatActions>(set => ({
   messages: {},
   windows: {},

   addMessage: message =>
      set(state => {
         const { conversationId, ...rest } = message
         const window = state.windows[conversationId]
         const shouldIncrementUnread = window?.minimized || !window?.isOpen

         console.log(message)

         return {
            messages: {
               ...state.messages,
               [conversationId]: [
                  ...(state.messages[conversationId] ?? []),
                  {
                     ...rest,
                     conversationId,
                     isRead: false,
                  },
               ],
            },
            windows: shouldIncrementUnread
               ? {
                    ...state.windows,
                    [conversationId]: {
                       ...window,
                       unreadCount: (window?.unreadCount ?? 0) + 1,
                    },
                 }
               : state.windows,
         }
      }),

   setConversation: (conversationId, participants, messages) =>
      set(state => ({
         messages: { ...state.messages, [conversationId]: messages },
         windows: {
            ...state.windows,
            [conversationId]: {
               id: conversationId,
               participants,
               isOpen: true,
               unreadCount: 0,
               minimized: false,
            },
         },
      })),

   markAllMessagesAsReadUpTo: (
      conversationId,
      lastReadMessageId,
      readAt,
      readerId,
      currentUserId,
   ) =>
      set(state => {
         if (readerId === currentUserId) return state

         const messages = state.messages[conversationId]
         if (!messages) return state

         const watermarkIndex = messages.findIndex(m => m.id === lastReadMessageId)
         if (watermarkIndex === -1) return state

         return {
            messages: {
               ...state.messages,
               [conversationId]: messages.map((msg, idx) =>
                  idx <= watermarkIndex ? { ...msg, isRead: true, readAt } : msg,
               ),
            },
         }
      }),

   openWindow: id =>
      set(state => ({
         windows: {
            ...state.windows,
            [id]: { ...state.windows[id], id, isOpen: true, minimized: false, unreadCount: 0 },
         },
      })),

   minimizeWindow: id =>
      set(state => ({
         windows: {
            ...state.windows,
            [id]: { ...state.windows[id], minimized: true },
         },
      })),

   closeWindow: id =>
      set(state => {
         const { [id]: _, ...rest } = state.windows
         return { windows: rest }
      }),
}))
