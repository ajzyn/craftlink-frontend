import { Skeleton } from "@/shared/components/ui/skeleton"

interface CategoryBannerSkeletonProps {
   showDescription: boolean
}

export const CategoryBannerSkeleton = ({ showDescription }: CategoryBannerSkeletonProps) => {
   return (
      <>
         <span className="bg-white/30 rounded-lg p-3">
            <Skeleton className="h-8 w-8 rounded" />
         </span>
         <div>
            <Skeleton className="h-[2.5rem] w-2/3 rounded-md" />
            {showDescription && <Skeleton className="h-[1.75rem] w-full rounded-md mt-2" />}
         </div>
      </>
   )
}
