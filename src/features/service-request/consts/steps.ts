import type { ServiceRequestStep } from "@/features/service-request/types/step.ts"
import { Bell, Clock, FileText, MapPin } from "lucide-react"

export const steps: ServiceRequestStep[] = [
   {
      id: 0,
      title: "Wybierz dzielnice",
      icon: MapPin,
   },
   {
      id: 1,
      title: "Termin usługi",
      icon: Clock,
   },
   {
      id: 2,
      title: "Opisz usługę",
      icon: FileText,
   },
   {
      id: 3,
      title: "Podsumowanie",
      icon: Bell,
   },
]
