import type { LifecycleStatus } from "@/shared/types/lifecycle-status-enum"
import type { JobRequestStatus } from "@/features/job-request/shared/types/status-enum"
import { DeadlineType } from "@/features/job-request/shared/types/deadline-types"
import type { SliceRequestParamsDto } from "@/shared/types/data"

export interface CreateJobRequestRequestDto {
   city: string
   district: string
   deadlineType: DeadlineType
   exactDate?: string
   serviceId: string
   description: string
}

export interface JobRequestDetailsDto {
   id: string
   status: JobRequestStatus
   createdAt: string
   requester: JobRequestRequesterDto
   service: JobRequestServiceDto
   description: string
   city: string
   district: string
   deadline: string | null
   deadlineType: DeadlineType
   exactDate: string | null
}

export interface JobRequestRequesterDto {
   id: string
   name: string
   email: string
   phoneNumber: string
}

export interface JobRequestServiceDto {
   serviceName: string
   serviceSlug: string
   serviceStatus: LifecycleStatus
   categoryName: string
   categorySlug: string
   categoryIconName: string
   categoryImageUrl: string
}

export interface ApplyJobRequestDto {
   conversationId: string
}

export interface JobRequestSummaryDto {
   id: string
   status: JobRequestStatus
   createdAt: string
   serviceName: string
   city: string
   district: string
   deadline: string
   deadlineType: DeadlineType
   exactDate: string
}

export interface MyJobRequestsParamsDto extends SliceRequestParamsDto {
   status?: JobRequestStatus
}

export interface JobRequestFeedParamsDto {
   matching?: boolean
   city?: string
   district?: string
   deadlineFrom?: string
   deadlineTo?: string
   page?: number
}
