import { type ComponentType, type LazyExoticComponent } from "react"
import { lazyRouteComponent } from "@tanstack/react-router"
import type { Authority } from "@/features/auth/types/auth-types"

export interface AppRouteConfig {
   path: string
   element: ComponentType | LazyExoticComponent<ComponentType>
   authRequired?: boolean
   requiredAuthorities?: Authority[]
}

export const appRoutes: AppRouteConfig[] = [
   {
      path: "/",
      element: lazyRouteComponent(() => import("@/features/dashboard/pages/dashboard-page")),
   },
   {
      path: "/login",
      element: lazyRouteComponent(() => import("@/features/auth/pages/auth-page")),
   },
   {
      path: "/kategoria/$categorySlug",
      element: lazyRouteComponent(() => import("@/features/categories/pages/category-page")),
   },
   {
      path: "/zamowienie-uslugi/$serviceSlug",
      element: lazyRouteComponent(() => import("@/features/job-request/pages/job-request-page")),
   },
   {
      path: "/kontakt",
      element: lazyRouteComponent(() => import("@/features/categories/pages/category-page")), //TODO: create this page
   },
]
