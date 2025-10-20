import type { LucideIcon } from "lucide-react"
import type { JobRequestData } from "@/features/job-request/create/utils/form-schema"

export interface JobRequestStep {
   id: number
   title: string
   icon: LucideIcon
   component: React.ReactNode
   validate?: keyof JobRequestData
}
