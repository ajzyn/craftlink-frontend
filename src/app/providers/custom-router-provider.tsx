import { router } from "@/app/router/builder"
import { RouterProvider } from "@tanstack/react-router"

export const CustomRouterProvider = () => <RouterProvider router={router} />
