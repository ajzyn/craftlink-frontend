import { createQueryKeys } from "@/shared/api/query-keys-factory"

export const authKeys = createQueryKeys("auth", {
   currentUser: null,
})
