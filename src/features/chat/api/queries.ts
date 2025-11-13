import { conversationKeys } from "@/features/chat/api/keys"
import { useQuery } from "@tanstack/react-query"
import { getAllConversations, getConversation } from "@/features/chat/api/api"

export const useConversationHistoryQuery = (conversationId: string) => {
   return useQuery({
      queryKey: conversationKeys.history(conversationId!),
      queryFn: () => getConversation(conversationId),
      enabled: !!conversationId,
   })
}

export const useAllConversationsQuery = () => {
   return useQuery({
      queryKey: conversationKeys.all,
      queryFn: () => getAllConversations(),
      refetchInterval: 10000,
      refetchOnWindowFocus: true,
   })
}
