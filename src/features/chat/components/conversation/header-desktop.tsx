import { CardHeader, CardTitle } from "@/shared/ui/card"
import { useConversationStore } from "@/features/chat/stores/use-conversation-store"
import { useShallow } from "zustand/react/shallow"
import { useMemo } from "react"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Minus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"

interface ChatWindowHeaderProps {
   conversationId: string
   minimized: boolean
}

export const HeaderDesktop = ({ conversationId, minimized }: ChatWindowHeaderProps) => {
   const userId = useAuthStore(state => state.user?.id)
   const { closeWindow, minimizeWindow, unreadCount, maximizeWindow, participants } =
      useConversationStore(
         useShallow(state => ({
            closeWindow: state.closeWindow,
            minimizeWindow: state.minimizeWindow,
            unreadCount: state.windows[conversationId]?.unreadCount ?? 0,
            maximizeWindow: state.openWindow,
            participants: state.windows[conversationId]?.participants,
         })),
      )

   const chatRecipientNames = useMemo(
      () => participants?.filter(p => p.id !== userId).map(p => p.name),
      [participants, userId],
   )

   return (
      <CardHeader
         onClick={() => minimized && maximizeWindow(conversationId)}
         className={cn(
            "bg-primary/50 flex flex-row items-center justify-between",
            minimized ? "cursor-pointer py-0 h-full" : "py-6",
         )}
      >
         <CardTitle className="flex items-center gap-2 text-sm capitalize font-semibold truncate">
            <span>{chatRecipientNames?.join(", ")}</span>
            {unreadCount > 0 && (
               <Badge
                  className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                  variant="destructive"
               >
                  {unreadCount}
               </Badge>
            )}
         </CardTitle>

         <div className="flex items-center gap-1">
            {!minimized && (
               <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex h-6 w-6 text-muted-foreground hover:text-foreground items-center justify-center"
                  onClick={e => {
                     e.stopPropagation()
                     minimizeWindow(conversationId)
                  }}
               >
                  <Minus className="h-4 w-4" />
               </Button>
            )}

            <Button
               variant="ghost"
               size="icon"
               className="h-6 w-6 text-muted-foreground hover:text-destructive flex items-center justify-center"
               onClick={e => {
                  e.stopPropagation()
                  closeWindow(conversationId)
               }}
            >
               <X className="h-4 w-4" />
            </Button>
         </div>
      </CardHeader>
   )
}
