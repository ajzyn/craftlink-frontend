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
      path: "/kategoria/$categorySlug",
      element: lazyRouteComponent(() => import("@/features/categories/pages/category-page.tsx")),
   },
   {
      path: "/usluga/$serviceSlug",
      element: lazyRouteComponent(() => import("@/features/services/pages/service-page.tsx")),
   },
   {
      path: "/kontakt",
      element: lazyRouteComponent(() => import("@/features/services/pages/service-page.tsx")), //TODO: create this page
   },
]
