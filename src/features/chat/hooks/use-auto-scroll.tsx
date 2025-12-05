import { useEffect, useRef, useState } from "react"
import type { ConversationMessage } from "@/features/chat/stores/use-conversation-store"

export const useAutoScroll = (messages: ConversationMessage[]) => {
   const scrollRef = useRef<HTMLDivElement>(null)
   const [isNearBottom, setIsNearBottom] = useState(true)
   const prevMessagesLengthRef = useRef(messages.length)
   const hasScrolledManuallyRef = useRef(false)
   const isInitialLoadRef = useRef(true)

   const handleScroll = () => {
      const el = scrollRef.current
      if (!el) return

      const threshold = 100
      const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
      const isNear = distanceFromBottom < threshold

      setIsNearBottom(isNear)

      hasScrolledManuallyRef.current = distanceFromBottom > threshold
   }

   useEffect(() => {
      const el = scrollRef.current
      if (!el) return

      const hasNewMessages = messages.length > prevMessagesLengthRef.current
      prevMessagesLengthRef.current = messages.length

      if (isInitialLoadRef.current && messages.length > 0) {
         el.scrollTop = el.scrollHeight
         isInitialLoadRef.current = false
         return
      }

      if (hasNewMessages && !hasScrolledManuallyRef.current && isNearBottom) {
         el.scrollTop = el.scrollHeight
      }
   }, [messages, isNearBottom])

   return { scrollRef, handleScroll }
}
