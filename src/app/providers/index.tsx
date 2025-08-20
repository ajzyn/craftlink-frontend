import { QueryProvider } from "@/app/providers/query-provider"
import { CustomRouterProvider } from "@/app/providers/custom-router-provider"

export const AppProviders = () => (
   <QueryProvider>
      <CustomRouterProvider />
   </QueryProvider>
)
