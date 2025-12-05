export interface ConversationWebsocketEvent<T> {
   type: string
   payload: T
}

export interface ConversationMessageDto {
   id: string
   isRead: boolean
   senderId: string
   content: string
   sentAt: string
   conversationId: string
}

export interface MyConversationsDto {
   conversations: ConversationDto[]
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
