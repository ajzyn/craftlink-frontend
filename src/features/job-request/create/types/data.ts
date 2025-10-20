import type { DeadlineType } from "@/features/job-request/shared/types/deadline-types"

export interface CreateJobRequestRequestDto {
   city: string
   district: string
   deadlineType: DeadlineType
   exactDate?: string
   serviceId: string
   description: string
}
