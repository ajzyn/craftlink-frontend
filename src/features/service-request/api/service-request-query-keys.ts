import type { ServiceRequestRequestDto } from "@/features/service-request/types/service-request-types"

export const serviceRequestQueryKeys = {
   all: ["service-request", "all"],
   detail: (id: string) => ["service-request", "detail", id],
   fliters: (filters: ServiceRequestRequestDto) => ["service-request", "list", filters],
}
