import { chatKeys } from "@/features/chat/api/keys"
import { useQuery } from "@tanstack/react-query"
import { chatApi } from "@/features/chat/api/api"

export const useChatHistoryQuery = (conversationId?: string) => {
   return useQuery({
      queryKey: chatKeys.history(conversationId!),
      queryFn: () => chatApi.getConversation(conversationId!),
      enabled: !!conversationId,
   })
}
