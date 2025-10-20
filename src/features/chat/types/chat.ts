export interface ChatMessage {
   id: string
   senderId: string
   content: string
   sentAt: string
}

export interface ChatParticipant {
   id: string
   name: string
}

export interface Conversation {
   id: string
   participants: ChatParticipant[]
   messages: ChatMessage[]
}
