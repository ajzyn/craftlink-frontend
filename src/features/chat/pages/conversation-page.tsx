import { useParams } from "@tanstack/react-router"
import { Container } from "@/features/chat/components/conversation/container"

const ConversationPage = () => {
   const { conversationId } = useParams({ from: "/wiadomosci/$conversationId" })

   return (
      <div className="fixed top-16 z-51 bottom-0 left-0 w-full flex flex-col bg-background">
         <Container conversationId={conversationId} />
      </div>
   )
}

export default ConversationPage
