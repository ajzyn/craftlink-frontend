import { memo, useEffect, useMemo } from "react"
import { Minus, X } from "lucide-react"
import { ChatMessageList } from "@/features/chat/components/chat-message-list"
import { ChatInput } from "@/features/chat/components/chat-input"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { useChatSocket } from "@/features/chat/hooks/use-chat-socket"
import { useChatWindowStore } from "@/features/chat/stores/use-chat-window-store"
import { useChatMessages } from "@/features/chat/hooks/use-chat-messages"
import { useShallow } from "zustand/react/shallow"
import { Badge } from "@/shared/ui/badge"
import { useAuthStore } from "@/features/auth/stores/use-auth-store"

interface ChatWindowInnerProps {
   conversationId: string
   minimized: boolean
}

export const ChatWindow = memo(({ conversationId, minimized }: ChatWindowInnerProps) => {
   const { messages, isError, isLoading } = useChatMessages(conversationId)
   const { sendMessage, markAsRead } = useChatSocket(conversationId)
   const userId = useAuthStore(state => state.user?.id)

   console.log(messages)

   const { unreadCount, participants } = useChatWindowStore(
      useShallow(state => ({
         unreadCount: state.windows[conversationId]?.unreadCount ?? 0,
         participants: state.windows[conversationId]?.participants,
      })),
   )

   const {
      closeWindow,
      minimizeWindow,
      openWindow: maximizeWindow,
   } = useChatWindowStore(
      useShallow(state => ({
         closeWindow: state.closeWindow,
         minimizeWindow: state.minimizeWindow,
         openWindow: state.openWindow,
      })),
   )

   useEffect(() => {
      if (minimized) return

      const unreadFromOthers = messages.some(msg => !msg.isRead && msg.senderId !== userId)

      if (unreadFromOthers) {
         markAsRead()
      }
   }, [messages, minimized, userId, markAsRead, conversationId])

   const chatRecipientNames = useMemo(
      () => participants?.filter(p => p.id !== userId).map(p => p.name),
      [participants, userId],
   )

   if (isLoading) {
      return (
         <div className="flex items-center justify-center h-40 w-64 rounded-md border bg-muted">
            <span className="text-sm text-muted-foreground">Ładowanie czatu...</span>
         </div>
      )
   }

   return (
      <Card
         className={cn(
            "flex flex-col py-0 shadow-lg rounded-xl overflow-hidden bg-background",
            "transition-all duration-300",
            minimized
               ? "h-12 w-64 cursor-pointer select-none"
               : "h-[500px] w-[350px] sm:h-[600px] sm:w-[400px]",
         )}
      >
         <CardHeader
            onClick={() => minimized && maximizeWindow(conversationId)}
            className={cn(
               "bg-primary/50 flex flex-row items-center justify-between",
               minimized ? "cursor-pointer py-0 h-full" : "py-6",
            )}
         >
            <CardTitle className="text-sm capitalize font-semibold truncate">
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

         {!minimized && (
            <>
               <CardContent className="px-0 flex flex-col flex-1 overflow-hidden">
                  {isError ? (
                     <div className="flex items-center justify-center h-full text-sm text-destructive">
                        Błąd wczytywania wiadomości
                     </div>
                  ) : (
                     <ChatMessageList participants={participants} messages={messages} />
                  )}
               </CardContent>

               <div className="p-2">
                  <ChatInput onSend={sendMessage} />
               </div>
            </>
         )}
      </Card>
   )
})
