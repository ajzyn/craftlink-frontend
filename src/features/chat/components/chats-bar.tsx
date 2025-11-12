import { useChatWindowStore } from "@/features/chat/stores/use-chat-window-store"
import { ChatWindow } from "./chat-window"
import { useShallow } from "zustand/react/shallow"
import { isEmpty } from "lodash"

export const ChatsBar = () => {
   const openedWindows = useChatWindowStore(
      useShallow(state => Object.values(state.windows).filter(w => w.isOpen)),
   )

   if (isEmpty(openedWindows)) return null

   return (
      <div className="fixed bottom-0 right-4 flex gap-3 z-50">
         {openedWindows.map(w => (
            <ChatWindow key={w.id} conversationId={w.id} minimized={w.minimized} />
         ))}
      </div>
   )
}
