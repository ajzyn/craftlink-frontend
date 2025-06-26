import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { toast } from "sonner"
import type { PropsWithChildren } from "react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: () => false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
      onError: (error: any) => {
        if (error?.status !== 401) {
          toast.error("Wystąpił błąd: " + error.message)
        }
      },
    },
  },
})

export const QueryProvider = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
