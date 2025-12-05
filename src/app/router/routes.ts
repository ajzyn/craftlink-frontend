import { type ComponentType, type LazyExoticComponent } from "react"
import { lazyRouteComponent } from "@tanstack/react-router"
import type { Authority } from "@/features/auth/api/types"

export type AppRouteConfig =
   | {
        path: string
        element: ComponentType | LazyExoticComponent<ComponentType>
        authRequired?: boolean
        requiredAuthorities?: Authority[]
        children?: never
     }
   | {
        path: string
        element?: never
        authRequired?: boolean
        requiredAuthorities?: Authority[]
        children: AppRouteConfig[]
     }

//TODO: add routing protections and consider if its good to have them all as lazy loaded

export const appRoutes: AppRouteConfig[] = [
   {
      path: "/",
      element: lazyRouteComponent(() => import("@/features/dashboard/pages/dashboard-page")),
   },
   {
      path: "/zaloguj",
      element: lazyRouteComponent(() => import("@/features/auth/pages/login-page")),
   },
   {
      path: `/zarejestruj`,
      element: lazyRouteComponent(() => import("@/features/auth/pages/register-specialist-page")),
   },
   // {
   //    path: "/kategoria/$categorySlug",
   //    element: lazyRouteComponent(() => import("@/features/categories/pages/category-page")),
   // },
   {
      path: "/wiadomosci",
      children: [
         {
            path: "/",
            element: lazyRouteComponent(
               () => import("@/features/chat/pages/conversation-list-page"),
            ),
         },
         {
            path: "/$conversationId",
            element: lazyRouteComponent(() => import("@/features/chat/pages/conversation-page")),
         },
      ],
   },
   {
      path: "/zlecenia",
      children: [
         {
            path: "/",
            element: lazyRouteComponent(
               () => import("@/features/job-request/browse/all/pages/all-job-requests-page"),
            ),
         },
         {
            path: "/nowe",
            children: [
               {
                  path: "/",
                  element: lazyRouteComponent(
                     () => import("@/features/job-request/create/pages/select-category-page"),
                  ),
               },
               {
                  path: "/$categorySlug",
                  element: lazyRouteComponent(
                     () => import("@/features/job-request/create/pages/select-service-page"),
                  ),
               },
               {
                  path: "/$categorySlug/$serviceSlug",
                  element: lazyRouteComponent(
                     () => import("@/features/job-request/create/pages/create-job-request-page"),
                  ),
               },
            ],
         },
         {
            path: "moje",
            element: lazyRouteComponent(
               () => import("@/features/job-request/browse/mine/pages/my-job-requests-page"),
            ),
         },
         {
            path: "$id",
            element: lazyRouteComponent(
               () => import("@/features/job-request/details/pages/job-request-details-page"),
            ),
         },
      ],
   },
   // {
   //    path: "/kontakt",
   //    element: lazyRouteComponent(() => import("@/features/categories/pages/category-page")), //TODO: create this pages
   // },
]
