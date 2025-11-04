import { createQueryKeys } from "@/shared/api/query-keys-factory"

export const serviceKeys = createQueryKeys("service", {
   all: null,
   detail: (slug: string) => [slug],
})
