import { Card, CardContent } from "@/shared/components/ui/card"
import { ChevronRight } from "lucide-react"
import { useRouter } from "@tanstack/react-router"
import type { CategoryServiceDto } from "@/entities/category"

interface ServiceItemProps {
   service: CategoryServiceDto
   categorySlug: string
}

export const Item = ({ service, categorySlug }: ServiceItemProps) => {
   const router = useRouter()

   const handleNavigate = () => {
      router.navigate({ to: `/zlecenia/nowe/${categorySlug}/${service.slug}` })
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
