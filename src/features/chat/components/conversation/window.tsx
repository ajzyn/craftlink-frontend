import { memo } from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/shared/ui/card"
import { Container } from "@/features/chat/components/conversation/container"

interface ChatWindowProps {
   conversationId: string
   minimized: boolean
}

export const Window = memo(({ conversationId, minimized }: ChatWindowProps) => {
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
         <Container conversationId={conversationId} minimized={minimized} />
      </Card>
   )
})
