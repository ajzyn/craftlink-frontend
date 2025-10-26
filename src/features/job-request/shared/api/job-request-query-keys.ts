import { createQueryKeys } from "@/shared/api/query-keys-factory"

export const jobRequestKeys = createQueryKeys("job-request", {
   all: null,
   detail: (id: string) => [id],
   mine: null,
})
