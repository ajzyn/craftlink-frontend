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
      element: lazyRouteComponent(() => import("@/features/dashboard/pages/dashboard-page")),
   },
   {
      path: "/kategoria/$categorySlug",
      element: lazyRouteComponent(() => import("@/features/categories/pages/category-page")),
   },
   {
      path: "/zamowienie-uslugi/$serviceSlug",
      element: lazyRouteComponent(
         () => import("@/features/service-request/pages/service-request-page"),
      ),
   },
   {
      path: "/kontakt",
      element: lazyRouteComponent(() => import("@/features/categories/pages/category-page")), //TODO: create this page
   },
]
