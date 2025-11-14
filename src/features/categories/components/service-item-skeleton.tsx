import { Card, CardContent } from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"

export const ServiceItemSkeleton = () => {
   return (
      <Card>
         <CardContent className="flex justify-between items-center">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-5" />
         </CardContent>
      </Card>
   )
}
