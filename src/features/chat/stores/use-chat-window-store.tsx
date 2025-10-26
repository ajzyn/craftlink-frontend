import { create } from "zustand"
import type { ChatMessage } from "@/features/chat/types/chat"

interface ChatState {
   messages: Record<string, ChatMessage[]>
   activeConversationId?: string
   isOpen: boolean
}

interface ChatActions {
   addMessage: (conversationId: string, msg: ChatMessage) => void
   setMessages: (conversationId: string, msgs: ChatMessage[]) => void
   setActiveConversation: (id?: string) => void
   maximize: () => void
   minimalize: () => void
   close: () => void
}

export const useChatWindowStore = create<ChatState & ChatActions>(set => ({
   messages: {},
   activeConversationId: undefined,
   isOpen: false,

   addMessage: (conversationId, msg) =>
      set(state => ({
         messages: {
            ...state.messages,
            [conversationId]: [...(state.messages[conversationId] || []), msg],
         },
      })),

   setMessages: (conversationId, msgs) =>
      set(state => ({
         messages: { ...state.messages, [conversationId]: msgs },
      })),

   setActiveConversation: id => set({ activeConversationId: id, isOpen: true }),
   minimalize() {
      set({ isOpen: false })
   },
   maximize: () => set({ isOpen: true }),

   close: () => set({ isOpen: false, activeConversationId: undefined }),
}))
