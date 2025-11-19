import { createQueryKeys } from "@/shared/api/query-keys-factory"
import type { JobRequestStatus } from "@/features/job-request/shared/types/status-enum"

export const jobRequestKeys = createQueryKeys("job-request", {
   all: null,
   detail: (id: string) => [id],
   mine: (status?: JobRequestStatus) => [status ?? "all"],
})
