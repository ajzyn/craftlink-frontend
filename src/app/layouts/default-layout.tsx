import { Toaster } from "sonner"
import type { ReactNode } from "react"
import { Header } from "@/app/layouts/header.tsx"

interface DefaultLayoutProps {
  children: ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="min-h-screen bg-background w-full">
      <Header />

      {/*{!pageConfig?.hideNavigation && (*/}
      {/*    <DashboardSidebar*/}
      {/*        navigation={navigation}*/}
      {/*        userType={userType}*/}
      {/*    />*/}
      {/*)}*/}

      <main className="p-6">
        <Toaster />
        {children}
      </main>
    </div>
  )
}
