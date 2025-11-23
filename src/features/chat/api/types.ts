export interface ConversationWebsocketEvent<T> {
   type: string
   payload: T
}

export interface ConversationMessageDto {
   id?: string //TODO: Separate type
   isRead?: boolean
   senderId?: string //TODO: Separate type
   content: string
   sentAt: string
   conversationId: string
   isPending?: boolean //TODO: Separate type
   tempId: string //TODO: Separate type
}

export interface ConversationMessageReadDto {
   conversationId: string
   lastReadMessageId: string
   readAt: string
   readerId: string
}

export interface ConversationParticipantDto {
   id: string
   name: string
}

export interface ConversationWithMessagesDto {
   id: string
   participants: ConversationParticipantDto[]
   messages: ConversationMessageDto[]
}

export enum ConversationType {
   JOB = "JOB",
}

export enum ConversationContextType {
   JOB = "JOB",
}

export interface ConversationContextDto {
   id: string
   type: ConversationContextType
}

export interface ConversationDto {
   id: string
   otherParticipants: ConversationParticipantDto[]
   type: ConversationType
   unreadMessageCount: number
   context: ConversationContextDto
   lastMessage: ConversationMessageDto | null
}

export interface UnreadConversationsCountDto {
   count: number
}
