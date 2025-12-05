import { createQueryKeys } from "@/shared/api/query-keys-factory"

export const conversationKeys = createQueryKeys("conversation", {
   all: null,
   unreadCount: () => ["unread-count"],
   history: (conversationId: string) => ["history", conversationId],
})
