import { DeadlineType } from "@/features/service-request/types/deadline-types"

export interface ServiceRequestDto {
   name: string
}

export interface ServiceRequestRequestDto {
   searchPhrase: string
}

export interface CreateJobRequestRequestDto {
   city: string
   district: string
   deadlineType: DeadlineType
   exactDate?: string
   serviceId: string
   description: string
}
