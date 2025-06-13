import { Toaster } from "sonner"
import type { ReactNode } from "react"

interface AdminLayoutProps {
  children?: ReactNode
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  )
}
