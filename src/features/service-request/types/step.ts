import type { LucideIcon } from "lucide-react"

export interface ServiceRequestStep {
   id: number
   title: string
   icon: LucideIcon
}

export interface ServiceRequestData {
   district: string
   serviceTime: {
      type: "asap" | "few_days" | "weeks" | "flexible" | "exact"
      exactDate?: Date
   }
   description: {
      text: string
      images: File[]
   }
}
