import { getFormattedDateTime } from "@/shared/utils"
import type { ConversationMessageDto } from "@/features/chat/api/types"
import { cn } from "@/lib/utils"
import { Check, CheckCheck } from "lucide-react"
import { memo } from "react"

interface ChatMessageProps {
   message: ConversationMessageDto
   isOwn: boolean
}

export const Item = memo(({ message, isOwn }: ChatMessageProps) => {
   return (
      <div
         className={cn(
            "flex flex-col w-3/4 gap-1 rounded-md pl-4 pr-2 pt-1 pb-2",
            isOwn ? "bg-primary/30 self-end" : "bg-secondary brightness-95 self-start",
         )}
      >
         <span className="flex justify-end items-center gap-2 text-sm text-gray-500">
            <span>{getFormattedDateTime(message.sentAt)}</span>

            {isOwn &&
               (!message.id ? (
                  <Check className={cn("w-3 h-3", "text-gray-500")} />
               ) : (
                  <CheckCheck
                     className={cn("w-3 h-3", message.isRead ? "text-blue-500" : "text-gray-500")}
                  />
               ))}
         </span>
         <span className="">{message.content}</span>
      </div>
   )
})
