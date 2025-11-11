import type { ConversationDto, ConversationWithMessagesDto } from "@/features/chat/api/types"
import { apiClient } from "@/shared/api/http-client"

export const getChatConversation = async (conversationId: string) => {
   const response = await apiClient.get<ConversationWithMessagesDto>(`/sec/chats/${conversationId}`)
   return response.data
}

export const getAllConversations = async () => {
   const response = await apiClient.get<ConversationDto[]>(`/sec/chats`)
   return response.data
}
