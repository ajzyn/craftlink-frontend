import { useChatWindowStore } from "@/features/chat/stores/use-chat-window-store"
import { StorageKeys, useLocalStorage } from "@/shared/hooks/use-local-storage"
import { toast } from "sonner"
import { useApplyJobRequestMutation } from "../../api/mutations"

export const useJobRequestActions = (requestId: string) => {
   const { value, write } = useLocalStorage<string[]>(StorageKeys.FAVORITE_JOBS)
   const applyMutation = useApplyJobRequestMutation()
   const setActiveConversation = useChatWindowStore(state => state.setActiveConversation)

   const handleShare = async () => {
      try {
         if (navigator.share) {
            const shareData = {
               title: "Sprawdź tę ofertę!",
               text: "Znalazłem świetną ofertę na CraftLink:",
               url: window.location.href,
            }

            await navigator.share(shareData)
         } else {
            toast.error("Udostępnianie nie jest obsługiwane w tej przeglądarce")
         }
      } catch (err) {
         toast.error("Nie można udostępnić tego zlecenia")
         console.error("Error during sharing job request:", err)
      }
   }

   const handleToggleSave = () => {
      const current = value ?? []
      const exists = current.includes(requestId)
      const updated = exists ? current.filter(id => id !== requestId) : [...current, requestId]

      write(updated)
   }

   const handleApply = async () => {
      const response = await applyMutation.mutateAsync(requestId)

      setActiveConversation(response.conversationId)
   }

   const handleDelete = () => {}

   const handleComplete = () => {}

   return {
      handleShare,
      handleApply,
      handleToggleSave,
      handleComplete,
      handleDelete,
      isApplying: applyMutation.isPending,
   }
}
