import { Button } from "@/shared/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"
import { useMemo } from "react"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"
import { useConversationStore } from "@/features/chat/stores/use-conversation-store"

interface MobileChatHeaderProps {
   conversationId: string
}

export const HeaderMobile = ({ conversationId }: MobileChatHeaderProps) => {
   const navigate = useNavigate()
   const participants = useConversationStore(state => state.windows[conversationId]?.participants)
   const userId = useAuthStore(state => state.user?.id)

   const chatRecipientNames = useMemo(
      () => participants?.filter(p => p.id !== userId).map(p => p.name),
      [participants, userId],
   )

   return (
      <div className="flex items-center justify-between p-4 pr-10 bg-primary/50 shadow-bottom-lg">
         <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/wiadomosci" })}>
            <ArrowLeft className="h-5 w-5 text-gray-700" />
         </Button>

         <h1 className="font-semibold capitalize truncate">{chatRecipientNames?.join(", ")}</h1>
      </div>
   )
}
