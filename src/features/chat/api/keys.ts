import { createQueryKeys } from "@/shared/api/query-keys-factory"

export const chatKeys = createQueryKeys("chat", {
   all: null,
   history: (conversationId: string) => ["chat", "history", conversationId],
})
