import { useNavigate } from "@tanstack/react-router"
import { useBreakpoint } from "@/shared/hooks"
import { useOpenChat } from "./use-open-chat"

export const useConversationNavigation = (conversationId: string) => {
   const { isMobile } = useBreakpoint()
   const openChatWindow = useOpenChat()
   const navigate = useNavigate()

   const openConversation = () => {
      if (isMobile) {
         navigate({ to: `/zlecenia/${conversationId}` })
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
