import { useEffect } from "react"

interface UsePreventScrollingProps {
  isActive?: boolean
}

export const usePreventScrolling = ({ isActive = true }: UsePreventScrollingProps = {}) => {
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isActive])
}
