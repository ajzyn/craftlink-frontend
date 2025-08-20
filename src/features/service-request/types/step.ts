import type { LucideIcon } from "lucide-react"
import type { ServiceRequestData } from "@/features/service-request/utils/service-request-form-schema"

export interface ServiceRequestStep {
   id: number
   title: string
   icon: LucideIcon
   component: React.ReactNode
   validate?: keyof ServiceRequestData
}
