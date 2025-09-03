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
   deadline?: string // LocalDate in Java, using string for ISO date format in TS
   preferredDate: string // LocalDate in Java, using string for ISO date format in TS
   serviceId: string // UUID in Java, using string in TS
   description: string
}
