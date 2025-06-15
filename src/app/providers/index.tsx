import { QueryProvider } from "./query-provider"
import { CustomRouterProvider } from "@/app/providers/custom-router-provider.tsx"

export const AppProviders = () => (
  <QueryProvider>
    <CustomRouterProvider />
  </QueryProvider>
)
