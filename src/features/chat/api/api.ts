import type { Conversation } from "@/features/chat/api/types"
import { apiClient } from "@/shared/api/http-client"

export const getChatConversation = async (conversationId: string): Promise<Conversation> => {
   const response = await apiClient.get<Conversation>(`/sec/chat/${conversationId}`)
   return response.data
}
