import { Skeleton } from "@/components/ui/skeleton"

interface LazyLoadingTriggerProps {
   hasNextPage: boolean
   loaderRef: React.RefObject<HTMLDivElement>
   isFetchingNextPage: boolean
   isInitialLoading: boolean
}

export const LazyLoadingTrigger = ({
   hasNextPage,
   loaderRef,
   isFetchingNextPage,
   isInitialLoading,
}: LazyLoadingTriggerProps) => {
   if (!hasNextPage || isInitialLoading) return null
   return (
      <div ref={loaderRef} className="col-span-full flex justify-center py-4">
         {isFetchingNextPage && (
            <div className="flex flex-col gap-2 items-center w-full">
               {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-40 w-full rounded-xl" />
               ))}
            </div>
         )}
      </div>
   )
}
