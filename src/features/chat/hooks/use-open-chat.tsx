import { useQueryClient } from "@tanstack/react-query"
import { useChatWindowStore } from "../stores/use-chat-window-store"
import { chatKeys } from "@/features/chat/api/keys"

export const useOpenChat = () => {
   const queryClient = useQueryClient()
   const openWindow = useChatWindowStore(state => state.openWindow)

   return (conversationId: string) => {
      openWindow(conversationId)
      queryClient.invalidateQueries({ queryKey: chatKeys.all })
   }
}
