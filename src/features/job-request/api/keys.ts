import { createQueryKeys } from "@/shared/api/query-keys-factory"
import type { JobRequestStatus } from "@/features/job-request/shared/types/status-enum"
import type { AllJobRequestSearchParams } from "../browse/all/types/query"

export const jobRequestKeys = createQueryKeys("job-request", {
   all: null,
   filters: (args: AllJobRequestSearchParams) => ["all", args],
   detail: (id: string) => [id],
   mine: (status?: JobRequestStatus) => [status ?? "all"],
})
