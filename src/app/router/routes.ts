import { type ComponentType, type LazyExoticComponent } from "react"
import { lazyRouteComponent } from "@tanstack/react-router"
import type { Authority } from "@/features/auth/api/types"

export interface AppRouteConfig {
   path: string
   element: ComponentType | LazyExoticComponent<ComponentType>
   authRequired?: boolean
   requiredAuthorities?: Authority[]
}

//TODO: nested routes
export const appRoutes: AppRouteConfig[] = [
   {
      path: "/",
      element: lazyRouteComponent(() => import("@/features/dashboard/pages/dashboard-page")),
   },
   {
      path: "/login",
      element: lazyRouteComponent(() => import("@/features/auth/pages/login-page")),
   },
   {
      path: `/register`,
      element: lazyRouteComponent(() => import("@/features/auth/pages/register-specialist-page")),
   },
   {
      path: "/kategoria/$categorySlug",
      element: lazyRouteComponent(() => import("@/features/categories/pages/category-page")),
   },
   {
      path: "/zamowienie-uslugi/$serviceSlug",
      element: lazyRouteComponent(
         () => import("@/features/job-request/create/pages/create-job-request-page"),
      ),
   },
   {
      path: "/zlecenia/$id",
      element: lazyRouteComponent(
         () => import("@/features/job-request/details/pages/job-request-details-page"),
      ),
   },
   {
      path: "/zlecenia/moje",
      element: lazyRouteComponent(
         () => import("@/features/job-request/browse/mine/pages/my-job-requests-page"),
      ),
   },
   {
      path: "/zlecenia",
      element: lazyRouteComponent(() => import("@/features/job-request/browse/all/pages/all")),
   },
   {
      path: "/kontakt",
      element: lazyRouteComponent(() => import("@/features/categories/pages/category-page")), //TODO: create this pages
   },
]
