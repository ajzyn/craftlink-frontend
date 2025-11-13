import { useParams } from "@tanstack/react-router"
import { Container } from "@/features/chat/components/conversation/container"

const ConversationPage = () => {
   const { conversationId } = useParams({ from: "/wiadomosci/$conversationId" })

   return (
      <div className="h-screen flex flex-col bg-background">
         <Container conversationId={conversationId} />
      </div>
   )
}

export default ConversationPage
