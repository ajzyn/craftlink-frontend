interface LazyLoadingTriggerProps {
   hasNextPage: boolean
   loaderRef: React.RefObject<HTMLDivElement>
   isInitialLoading: boolean
}

export const LazyLoadingTrigger = ({
   hasNextPage,
   loaderRef,
   isInitialLoading,
}: LazyLoadingTriggerProps) => {
   if (!hasNextPage || isInitialLoading) return null
   return <div ref={loaderRef} className="h-1" />
}
