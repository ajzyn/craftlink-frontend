import type { ChatMessage } from "@/features/chat/types/chat"

export const ChatMessageList = ({ messages }: { messages: ChatMessage[] }) => (
   <div className="flex flex-col gap-2 p-3 overflow-y-auto h-full">
      {messages.map(msg => (
         <div key={msg.sentAt + msg.senderId} className="flex flex-col">
            <span className="text-xs text-gray-500">{msg.senderId}</span>
            <span className="bg-gray-100 dark:bg-gray-800 rounded-md px-2 py-1">{msg.content}</span>
         </div>
      ))}
   </div>
)
