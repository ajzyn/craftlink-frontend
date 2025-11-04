import { createQueryKeys } from "@/shared/api/query-keys-factory"

export const locationKeys = createQueryKeys("location", {
   all: null,
   detail: (name: string) => [name],
})
