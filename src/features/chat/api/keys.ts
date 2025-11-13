import { createQueryKeys } from "@/shared/api/query-keys-factory"

export const conversationKeys = createQueryKeys("conversation", {
   all: null,
   history: (conversationId: string) => ["history", conversationId],
})
