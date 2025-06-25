import { Toaster } from "sonner"
import type { ReactNode } from "react"
import { Navigation } from "@/app/layouts/components/navigation.tsx"
import { Footer } from "@/shared/components/footer.tsx"

interface DefaultLayoutProps {
  children: ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="min-h-screen bg-background w-full">
      <Navigation />
      <div className="mt-16"></div>

      <main className="p-6 bg-gradient-to-br from-blue-50 via-background to-teal-50">
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  )
}
