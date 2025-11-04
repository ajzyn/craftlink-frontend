import { chatKeys } from "@/features/chat/api/keys"
import { useQuery } from "@tanstack/react-query"
import { getChatConversation } from "@/features/chat/api/api"

export const useChatHistoryQuery = (conversationId?: string) => {
   return useQuery({
      queryKey: chatKeys.history(conversationId!),
      queryFn: () => getChatConversation(conversationId!),
      enabled: !!conversationId,
   })
}
