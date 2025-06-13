import { Toaster } from "sonner"
import type { ReactNode } from "react"

interface SpecialistLayoutProps {
  children?: ReactNode
}

export const SpecialistLayout = ({ children }: SpecialistLayoutProps) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  )
}
