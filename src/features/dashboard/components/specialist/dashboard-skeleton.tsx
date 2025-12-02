import { Skeleton } from "@/shared/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"

export const DashboardSkeleton = () => {
   return (
      <div className="container mx-auto px-4 py-8">
         <div className="space-y-8">
            <div>
               <Skeleton className="h-9 w-64 mb-2" />
               <Skeleton className="h-5 w-96" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[1, 2, 3].map(i => (
                  <Card key={i}>
                     <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                           <div className="space-y-2 flex-1">
                              <Skeleton className="h-4 w-32" />
                              <Skeleton className="h-9 w-16" />
                           </div>
                           <Skeleton className="h-12 w-12 rounded-full" />
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>

            <Card>
               <CardHeader>
                  <Skeleton className="h-7 w-48" />
               </CardHeader>
               <CardContent className="space-y-3">
                  {[1, 2, 3].map(i => (
                     <Card key={i}>
                        <CardContent className="p-4 space-y-3">
                           <Skeleton className="h-6 w-3/4" />
                           <Skeleton className="h-4 w-full" />
                           <Skeleton className="h-4 w-2/3" />
                           <div className="flex gap-4">
                              <Skeleton className="h-3 w-24" />
                              <Skeleton className="h-3 w-24" />
                           </div>
                        </CardContent>
                     </Card>
                  ))}
               </CardContent>
            </Card>
         </div>
      </div>
   )
}
