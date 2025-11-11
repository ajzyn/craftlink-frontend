import { useAllConversationsQuery } from "@/features/chat/api/queries"
import { ConversationItemList } from "@/features/chat/components/conversation-item-list"
import { Section } from "@/shared/components/section"
import { Separator } from "@/shared/ui/separator"

const ConversationListPage = () => {
   const { data, isSuccess, isError, isLoading } = useAllConversationsQuery()

   if (!data) return null

   return (
      <section>
         <Section className="w-3/4 max-w-[800px] mx-auto mt-10" label="Wiadomości">
            <Separator className="mb-2" />
            {data.map((conversation, index) => (
               <div key={conversation.id}>
                  <ConversationItemList conversation={conversation} />
                  {index < data.length - 1 && <Separator />}
               </div>
            ))}
         </Section>
      </section>
   )
}

export default ConversationListPage
