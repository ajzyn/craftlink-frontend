import { Toaster } from "sonner"
import type { ReactNode } from "react"
import { Navigation } from "@/app/layouts/components/navigation"
import { Footer } from "@/shared/components/footer"
import { ChatsBar } from "@/features/chat/components/chats-bar"
import { Separator } from "@/shared/ui/separator"

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
            <ChatsBar />
            {children}
         </main>
         <Footer />
      </div>
   )
}
