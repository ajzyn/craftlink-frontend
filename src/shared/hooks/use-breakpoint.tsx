import { useEffect, useState } from "react"

const tailwindBreakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
}

export const useBreakpoint = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState("xs")

  useEffect(() => {
    const breakpointEntries = Object.entries(tailwindBreakpoints).sort(
      ([, a], [, b]) => parseInt(b) - parseInt(a),
    )

    const updateBreakpoint = () => {
      const width = window.innerWidth

      for (const [name, size] of breakpointEntries) {
        if (width >= parseInt(size)) {
          setCurrentBreakpoint(name)
          return
        }
      }
      setCurrentBreakpoint("xs")
    }

    updateBreakpoint()
    window.addEventListener("resize", updateBreakpoint)
    return () => window.removeEventListener("resize", updateBreakpoint)
  }, [])

  return {
    current: currentBreakpoint,
    isXs: currentBreakpoint === "xs",
    isSm: currentBreakpoint === "sm",
    isMd: currentBreakpoint === "md",
    isLg: currentBreakpoint === "lg",
    isXl: currentBreakpoint === "xl",
    is2Xl: currentBreakpoint === "2xl",
    isMobile: ["xs", "sm", "md"].includes(currentBreakpoint),
    isDesktop: ["lg", "xl", "2xl"].includes(currentBreakpoint),
  }
}
