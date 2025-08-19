import type { LucideIcon } from "lucide-react"
import type { ServiceRequestData } from "@/features/service-request/types/service-request-form-schema.ts"

export interface ServiceRequestStep {
   id: number
   title: string
   icon: LucideIcon
   component: React.ReactNode
   validate?: keyof ServiceRequestData
}
