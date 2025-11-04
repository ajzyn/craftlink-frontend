import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const JobRequestCardSkeleton = () => {
   return (
      <Card className="h-64 border border-gray-200 rounded-xl py-8 px-5 flex flex-col justify-between bg-white animate-in fade-in duration-300">
         <div className="flex justify-between items-start w-full">
            <div className="space-y-2">
               <Skeleton className="h-5 w-40" />
               <Skeleton className="h-3 w-28" />
            </div>

            <div className="flex flex-col items-end space-y-2">
               <Skeleton className="h-6 w-20 rounded-full" />
               <Skeleton className="h-3 w-16" />
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <div className="rounded-lg border border-gray-100 p-3 bg-gray-50 space-y-2">
               <Skeleton className="h-3 w-20" />
               <Skeleton className="h-4 w-32" />
            </div>

            {/* Box 2 */}
            <div className="rounded-lg border border-gray-100 p-3 bg-gray-50 space-y-2">
               <Skeleton className="h-3 w-24" />
               <Skeleton className="h-4 w-28" />
               <Skeleton className="h-3 w-20" />
            </div>
         </div>
      </Card>
   )
}
