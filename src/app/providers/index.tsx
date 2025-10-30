import { QueryProvider } from "@/app/providers/query-provider"
import { CustomRouterProvider } from "@/app/providers/custom-router-provider"
import { AuthProvider } from "@/app/providers/auth-provider"

export const AppProviders = () => (
   <QueryProvider>
      <AuthProvider>
         <CustomRouterProvider />
      </AuthProvider>
   </QueryProvider>
)
