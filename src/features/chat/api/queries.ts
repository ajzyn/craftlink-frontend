import { chatKeys } from "@/features/chat/api/keys"
import { useQuery } from "@tanstack/react-query"
import { getAllConversations, getChatConversation } from "@/features/chat/api/api"

export const useChatHistoryQuery = (conversationId?: string) => {
   return useQuery({
      queryKey: chatKeys.history(conversationId!),
      queryFn: () => getChatConversation(conversationId!),
      enabled: !!conversationId,
   })
}

export const useAllConversationsQuery = () => {
   return useQuery({
      queryKey: chatKeys.all,
      queryFn: () => getAllConversations(),
   })
}
