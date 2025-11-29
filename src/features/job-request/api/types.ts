import type { LifecycleStatus } from "@/shared/types"
import type { JobRequestStatus } from "@/features/job-request/shared/types/status-enum"
import { DeadlineType } from "@/features/job-request/shared/types/deadline-types"
import type { SliceParamsDto } from "@/shared/api/types"
import type { AllJobRequestSearchParams } from "@/features/job-request/browse/all/types/query"

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

export interface MyJobRequestsParamsDto extends SliceParamsDto {
   status?: JobRequestStatus
}

export interface AllJobRequestsParamsDto extends AllJobRequestSearchParams, SliceParamsDto {}
