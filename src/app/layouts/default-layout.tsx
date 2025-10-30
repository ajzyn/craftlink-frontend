import { Toaster } from "sonner"
import type { ReactNode } from "react"
import { Navigation } from "@/app/layouts/components/navigation"
import { Footer } from "@/components/footer"
import { ChatWindow } from "@/features/chat/components/chat-window"
import { Separator } from "@/components/ui/separator"

interface DefaultLayoutProps {
   children: ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
   return (
      <div className="min-h-screen flex flex-col bg-background w-full">
         <Navigation />
         <Separator className="mt-17" />

         <main className="flex-1 bg-gradient-to-br from-yellow-50 via-background to-teal-50">
            <Toaster />
            <ChatWindow />
            {children}
         </main>
         <Footer />
      </div>
   )
}
