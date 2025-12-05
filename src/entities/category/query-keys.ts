import { createQueryKeys } from "@/shared/api/query-keys-factory"

export const categoryKeys = createQueryKeys("category", {
   all: null,
   detail: (slug: string) => [slug],
})
