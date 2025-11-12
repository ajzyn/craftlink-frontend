import { useAllConversationsQuery } from "@/features/chat/api/queries"
import { Section } from "@/shared/components/section"
import { Separator } from "@/shared/ui/separator"
import { BackendErrorFallback } from "@/shared/components/backend-error-fallback"
import { ListItemSkeleton } from "@/features/chat/components/list-item-skeleton"
import { ListItem } from "@/features/chat/components/list-item"

const ConversationListPage = () => {
   const { data, isError, isFetching, refetch } = useAllConversationsQuery()

   return (
      <section>
         <Section className="w-3/4 max-w-[800px] mx-auto mt-10" label="Wiadomości">
            <Separator className="mb-2" />

            {isError ? (
               <BackendErrorFallback onRetry={refetch} isRetrying={isFetching} />
            ) : isFetching && !data ? (
               <ListItemSkeleton count={5} />
            ) : (
               data?.map((conversation, index) => (
                  <div key={conversation.id}>
                     <ListItem conversation={conversation} />
                     {index < data.length - 1 && <Separator />}
                  </div>
               ))
            )}
         </Section>
      </section>
   )
}

export default ConversationListPage
