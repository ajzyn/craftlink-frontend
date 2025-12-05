import { Skeleton } from "@/shared/components/ui/skeleton"

interface CategoryListSkeletonProps {
   length?: number
}

export const CategoryListSkeleton = ({ length = 6 }: CategoryListSkeletonProps) => {
   return Array.from({ length }).map((_, index) => (
      <div key={index} className="flex items-center space-x-4 p-3">
         <Skeleton className="h-[53px] w-72" />
      </div>
   ))
}
