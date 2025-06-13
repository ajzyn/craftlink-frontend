import { Toaster } from "sonner"
import type { ReactNode } from "react"

interface HomeLayoutProps {
  children?: ReactNode
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  )
}
