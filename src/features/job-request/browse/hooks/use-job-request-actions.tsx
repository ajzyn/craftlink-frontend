import { useApplyJobRequestMutation } from "@/features/job-request/browse/api/mutations"
import { useChatWindowStore } from "@/features/chat/stores/use-chat-window-store"

export const useJobRequestActions = (requestId: string) => {
   const applyMutation = useApplyJobRequestMutation()
   const setActiveConversation = useChatWindowStore(state => state.setActiveConversation)

   //TODO: handle the actions
   const onShare = () => {
      console.log("share" + requestId)
   }

   const onSave = () => {
      console.log("save" + requestId)
   }

   const onApply = async () => {
      const response = await applyMutation.mutateAsync(requestId)

      console.log("apply" + requestId)
      setActiveConversation(response.conversationId)
   }

   return {
      onShare,
      onSave,
      onApply,
      isApplying: applyMutation.isPending,
   }
}
