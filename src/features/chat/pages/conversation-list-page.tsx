import { useAllConversationsQuery } from "@/features/chat/api/queries"
import { Section } from "@/shared/components/section"
import { BackendErrorFallback } from "@/shared/components/backend-error-fallback"
import { ItemSkeleton } from "@/features/chat/components/conversations-list/item-skeleton"
import { Item } from "../components/conversations-list/item"
import { isEmpty } from "lodash"

const ConversationListPage = () => {
   const { data, isError, isFetching, refetch } = useAllConversationsQuery()

   return (
      <section>
         <Section className="min-h-[70vh] md:mt-16" label="Twoje wiadomości">
            <div className="md:px-6 md:pb-6">
               {isError ? (
                  <BackendErrorFallback onRetry={refetch} isRetrying={isFetching} />
               ) : isFetching && !data ? (
                  <ItemSkeleton count={5} />
               ) : isEmpty(data) ? (
                  <p className="text-heading-lg">Nie masz jeszcze żadnych rozmów</p>
               ) : (
                  <div className="space-y-3">
                     {data?.map(conversation => (
                        <div key={conversation.id}>
                           <Item conversation={conversation} />
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </Section>
      </section>
   )
}

export default ConversationListPage
