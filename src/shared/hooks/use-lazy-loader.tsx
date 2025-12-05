import { useEffect, useMemo, useRef } from "react"
import { throttle } from "lodash"

interface UseLazyLoaderProps {
   hasNextPage: boolean
   fetchNextPage: VoidFunction
   isFetchingNextPage?: boolean
   offset?: number
   containerRef?: React.RefObject<HTMLDivElement>
   isFirstPage?: boolean
}

export const useLazyLoader = ({
   hasNextPage,
   fetchNextPage,
   containerRef,
   isFetchingNextPage = false,
   offset = 1000,
   isFirstPage,
}: UseLazyLoaderProps) => {
   const loaderRef = useRef<HTMLDivElement | null>(null)

   const throttledFetch = useMemo(
      () => throttle(fetchNextPage, 1000, { leading: true, trailing: false }),
      [fetchNextPage],
   )

   useEffect(() => {
      if (!hasNextPage || isFetchingNextPage) return

      const observer = new IntersectionObserver(
         entries => {
            const first = entries[0]
            if (first.isIntersecting) {
               throttledFetch()
            }
         },
         {
            root: containerRef?.current ?? null,
            rootMargin: `${offset}px`,
         },
      )

      const current = loaderRef.current
      if (current) observer.observe(current)

      return () => {
         if (current) observer.unobserve(current)
         observer.disconnect()
      }
   }, [hasNextPage, throttledFetch, isFetchingNextPage, offset, containerRef, isFirstPage])

   return { loaderRef }
}
