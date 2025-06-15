import { Toaster } from "sonner"
import type { ReactNode } from "react"
import { Navigation } from "@/app/layouts/navigation.tsx"
import { Footer } from "@/shared/components/footer.tsx"

interface DefaultLayoutProps {
  children: ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="min-h-screen bg-background w-full">
      <Navigation />
      <div className="mt-16"></div>

      <main className="p-6">
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  )
}
