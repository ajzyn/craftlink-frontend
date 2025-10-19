import { Toaster } from "sonner"
import type { ReactNode } from "react"
import { Navigation } from "@/app/layouts/components/navigation"
import { Footer } from "@/components/footer"

interface DefaultLayoutProps {
   children: ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
   return (
      <div className="min-h-screen flex flex-col bg-background w-full">
         <Navigation />
         <div className="mt-17"></div>

         <main className="bg-gradient-to-br from-yellow-50 via-background to-teal-50">
            <Toaster />
            {children}
         </main>
         <Footer />
      </div>
   )
}
