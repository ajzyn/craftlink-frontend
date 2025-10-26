import type { Conversation } from "@/features/chat/types/chat"
import { apiClient } from "@/shared/api/http-client"

export const chatApi = {
   getConversation: async (conversationId: string): Promise<Conversation> => {
      const response = await apiClient.get<Conversation>(`/sec/chat/${conversationId}`)
      return response.data
   },
}
