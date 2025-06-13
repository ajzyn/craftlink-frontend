import { Toaster } from "sonner"
import type { ReactNode } from "react"

interface GeneralLayoutProps {
  children?: ReactNode
}

export const ClientLayout = ({ children }: GeneralLayoutProps) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  )
}
