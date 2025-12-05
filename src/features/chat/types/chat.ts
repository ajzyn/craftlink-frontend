export interface ConversationMessageWS {
   conversationId: string
   id: string
   senderId: string
   content: string
   sentAt: string
   tempId?: string
}

export interface ConversationMessageReadWS {
   conversationId: string
   lastReadMessageId: string
   readAt: string
   readerId: string
}
