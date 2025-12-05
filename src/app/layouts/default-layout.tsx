import { Toaster } from "sonner"
import type { ReactNode } from "react"
import { Header } from "@/app/layouts/components/header"
import { Footer } from "@/shared/components/footer"
import { WindowsBar } from "@/features/chat/components/conversation/windows-bar"

interface DefaultLayoutProps {
   children: ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
   return (
      <div className="min-h-screen flex flex-col bg-background w-full">
         <Header />
         <div className="mt-17" />

         <main className="flex-1 bg-gray-50 md:bg-gradient-to-br md:from-yellow-50 md:via-background md:to-teal-50">
            <Toaster />
            <WindowsBar />
            {children}
         </main>
         <Footer />
      </div>
   )
}
