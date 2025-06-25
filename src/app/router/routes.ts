import { type ComponentType, type LazyExoticComponent } from "react"
import { lazyRouteComponent } from "@tanstack/react-router"

export interface AppRouteConfig {
  path: string
  element: ComponentType | LazyExoticComponent<ComponentType>
  isPrivate?: boolean
  requiredAuthorities?: string[]
}

export const appRoutes: AppRouteConfig[] = [
  {
    path: "/",
    element: lazyRouteComponent(() => import("@/features/dashboard/pages/dashboard-page.tsx")),
  },
  {
    path: "/dashboard",
    element: lazyRouteComponent(() => import("@/features/dashboard/pages/dashboard-page.tsx")),
  },
]
