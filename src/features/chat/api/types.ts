export interface ChatEventEnvelopeDto<T> {
   type: string
   payload: T
}

export interface ChatMessageDto {
   id: string
   isRead?: boolean
   senderId: string
   content: string
   sentAt: string
   conversationId: string
}

export interface ChatMessageReadDto {
   conversationId: string
   lastReadMessageId: string
   readAt: string
   readerId: string
}

export interface ChatParticipantDto {
   id: string
   name: string
}

export interface ConversationWithMessagesDto {
   id: string
   participants: ChatParticipantDto[]
   messages: ChatMessageDto[]
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
   otherParticipants: ChatParticipantDto[]
   type: ConversationType
   unreadMessageCount: number
   context: ConversationContextDto
   lastMessage: ChatMessageDto | null
}
