import type { CategoryBasicDto } from "@/entities/category"
import { Card, CardContent } from "@/shared/components/ui/card"
import { DynamicIcon } from "@/shared/components/dynamic-icon"
import { ChevronRight } from "lucide-react"
import { useNavigate } from "@tanstack/react-router"

interface CategoryCardProps {
   category: CategoryBasicDto
}

export const Item = ({ category }: CategoryCardProps) => {
   const navigate = useNavigate()

   const handleCategorySelect = () => {
      navigate({ to: `/zlecenia/nowe/${category.slug}` })
   }

   return (
      <Card
         onClick={handleCategorySelect}
         className="group pressed-button hover:shadow-lg transition-all"
      >
         <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
               <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <DynamicIcon iconName={category.iconName} className="w-6 h-6 text-primary" />
               </div>
               <span className="text-lg font-semibold">{category.name}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
         </CardContent>
      </Card>
   )
}
