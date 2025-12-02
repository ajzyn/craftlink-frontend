import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/shared/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
   title: string
   value: number | string
   icon: LucideIcon
   iconColor?: string
   description?: string
}

export const StatCard = ({
   title,
   value,
   icon: Icon,
   iconColor = "text-primary",
   description,
}: StatCardProps) => {
   return (
      <Card>
         <CardContent className="p-6">
            <div className="flex items-center justify-between">
               <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{title}</p>
                  <p className="text-3xl font-bold">{value}</p>
                  {description && (
                     <p className="text-xs text-muted-foreground mt-1">{description}</p>
                  )}
               </div>
               <div className={cn("p-3 rounded-full bg-primary/10", iconColor)}>
                  <Icon className="h-6 w-6" />
               </div>
            </div>
         </CardContent>
      </Card>
   )
}
