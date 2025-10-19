import { useEffect, useState } from "react"

const breakpoints = {
   sm: 640,
   md: 768,
   lg: 1024,
   xl: 1280,
   "2xl": 1536,
}

export const useBreakpoint = () => {
   const [width, setWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0)

   useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth)
      window.addEventListener("resize", handleResize)
      handleResize()
      return () => window.removeEventListener("resize", handleResize)
   }, [])

   return {
      width,
      isSm: width >= breakpoints.sm,
      isMd: width >= breakpoints.md,
      isLg: width >= breakpoints.lg,
      isXl: width >= breakpoints.xl,
      is2Xl: width >= breakpoints["2xl"],
      isMobile: width < breakpoints.md,
      isTablet: width >= breakpoints.md && width < breakpoints.lg,
      isDesktop: width >= breakpoints.lg,
   }
}
