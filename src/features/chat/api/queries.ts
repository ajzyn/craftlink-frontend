import { conversationKeys } from "@/features/chat/api/keys"
import { useQuery } from "@tanstack/react-query"
import {
   getAllConversations,
   getConversation,
   getUnreadConversationsCount,
} from "@/features/chat/api/api"

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
      queryFn: getAllConversations,
      refetchInterval: 10000,
      refetchOnWindowFocus: true,
   })
}

export const useUnreadConversationCountQuery = () => {
   return useQuery({
      queryKey: conversationKeys.unreadCount(),
      queryFn: getUnreadConversationsCount,
      refetchInterval: 20000,
      refetchOnWindowFocus: true,
   })
}
