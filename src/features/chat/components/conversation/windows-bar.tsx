import { useConversationStore } from "@/features/chat/stores/use-conversation-store"
import { Window } from "./window"
import { useShallow } from "zustand/react/shallow"
import { isEmpty } from "lodash"
import { useBreakpoint } from "@/shared/hooks"

export const WindowsBar = () => {
   const { isMobile } = useBreakpoint()
   const openedWindows = useConversationStore(
      useShallow(state => Object.values(state.windows).filter(w => w.isOpen)),
   )

   if (isEmpty(openedWindows) || isMobile) return null

   return (
      <div className="fixed bottom-0 right-4 flex gap-3 z-50">
         {openedWindows.map(w => (
            <Window key={w.id} conversationId={w.id} minimized={w.minimized} />
         ))}
      </div>
   )
}
