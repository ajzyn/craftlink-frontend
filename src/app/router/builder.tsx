import {
   type AnyRoute,
   createRootRoute,
   createRoute,
   createRouter,
   Outlet,
} from "@tanstack/react-router"
import { type AppRouteConfig, appRoutes } from "@/app/router/routes"
import { ProtectedRoute } from "@/app/router/protected-route"
import { DefaultLayout } from "@/app/layouts/default-layout"

export const rootRoute = createRootRoute({
   component: () => (
      <DefaultLayout>
         <Outlet />
      </DefaultLayout>
   ),
})

const buildRoutes = (configs: AppRouteConfig[], parent: AnyRoute = rootRoute): AnyRoute[] => {
   return configs.map(({ path, element: Comp, authRequired, requiredAuthorities, children }) => {
      const route = createRoute({
         getParentRoute: () => parent,
         path,
         component: () => {
            const content = children ? <Outlet /> : <Comp />
            return authRequired ? (
               <ProtectedRoute requiredAuthorities={requiredAuthorities}>{content}</ProtectedRoute>
            ) : (
               content
            )
         },
      })

      return children ? route.addChildren(buildRoutes(children, route)) : route
   })
}

const routeTree = rootRoute.addChildren(buildRoutes(appRoutes))

export const router = createRouter({
   routeTree,
})
