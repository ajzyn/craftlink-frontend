import type { CategoryServiceDto } from "@/features/categories/api/types"
import { Card, CardContent } from "@/shared/ui/card"
import { ChevronRight } from "lucide-react"
import { useRouter } from "@tanstack/react-router"

interface ServiceItemProps {
   service: CategoryServiceDto
}

export const ServiceItem = ({ service }: ServiceItemProps) => {
   const router = useRouter()

   const handleNavigate = () => {
      router.navigate({ to: `/zlecenia/stworz/${service.slug}` })
   }

   return (
      <Card onClick={handleNavigate} className="group pressed-button">
         <CardContent className="flex justify-between">
            <p className="text-heading-lg">{service.name}</p>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-all duration-150" />
         </CardContent>
      </Card>
   )
}
