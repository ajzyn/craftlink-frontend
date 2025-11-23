import { create } from "zustand"
import type { ConversationMessageDto, ConversationParticipantDto } from "@/features/chat/api/types"

interface ConversationWindow {
   id: string
   isOpen: boolean
   minimized: boolean
   unreadCount: number
   participants: ConversationParticipantDto[]
}

interface ConversationState {
   messages: Record<string, ConversationMessageDto[]>
   windows: Record<string, ConversationWindow>
}

interface ConversationActions {
   addMessage: (message: ConversationMessageDto) => void
   addOptimisticMessage: (message: Omit<ConversationMessageDto, "id" | "sentAt">) => void
   confirmMessage: (serverMessage: ConversationMessageDto) => void
   setConversation: (
      conversationId: string,
      participants: ConversationParticipantDto[],
      messages: ConversationMessageDto[],
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

export const useConversationStore = create<ConversationState & ConversationActions>(set => ({
   messages: {},
   windows: {},

   addMessage: message =>
      set(state => {
         const { conversationId } = message
         const messages = state.messages[conversationId] ?? []
         const window = state.windows[conversationId]
         const shouldIncrementUnread = window?.minimized || !window?.isOpen

         return {
            messages: {
               ...state.messages,
               [conversationId]: [...messages, { ...message, isRead: false }],
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

   addOptimisticMessage: message =>
      set(state => {
         const { conversationId } = message

         return {
            messages: {
               ...state.messages,
               [conversationId]: [
                  ...(state.messages[conversationId] ?? []),
                  {
                     ...message,
                     isRead: false,
                     sentAt: new Date().toISOString(),
                  } as ConversationMessageDto,
               ],
            },
         }
      }),

   confirmMessage: serverMessage =>
      set(state => {
         const messages = state.messages[serverMessage.conversationId]
         if (!messages) return state

         return {
            messages: {
               ...state.messages,
               [serverMessage.conversationId]: messages.map(msg =>
                  msg.tempId === serverMessage.tempId ? { ...serverMessage, isRead: false } : msg,
               ),
            },
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
