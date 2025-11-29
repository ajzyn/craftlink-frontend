import { useNavigate } from "@tanstack/react-router"
import { useBreakpoint } from "@/shared/hooks"
import { useConversationStore } from "@/features/chat/stores/use-conversation-store"

export const useConversationNavigation = (conversationId: string) => {
   const { isMobile } = useBreakpoint()
   const openChatWindow = useConversationStore(state => state.openWindow)
   const navigate = useNavigate()

   const openConversation = () => {
      if (isMobile) {
         navigate({ to: `/wiadomosci/${conversationId}` })
      } else {
         openChatWindow(conversationId)
      }
   }

   const navigateToContext = (contextId: string) => (e: React.MouseEvent) => {
      e.stopPropagation()
      navigate({ to: `/zlecenia/${contextId}` })
   }

   return { openConversation, navigateToContext }
}
