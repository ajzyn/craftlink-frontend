import { Skeleton } from "@/shared/ui/skeleton"
import { Separator } from "@/shared/ui/separator"

export const ItemSkeleton = ({ count = 3 }: { count?: number }) => {
   return (
      <>
         {Array.from({ length: count }).map((_, index) => (
            <div key={index}>
               <div className="p-4 flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-full" />

                  <div className="flex-1 flex justify-between">
                     <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                     </div>

                     <div className="space-y-2 items-end flex flex-col">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-5 w-5 rounded-full" />
                     </div>
                  </div>
               </div>
               {index < count - 1 && <Separator />}
            </div>
         ))}
      </>
   )
}
