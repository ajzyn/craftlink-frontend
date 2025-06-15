import { router } from "@/app/router/builder.tsx"
import { RouterProvider } from "@tanstack/react-router"

export const CustomRouterProvider = () => <RouterProvider router={router} />
