import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router"
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
const buildRoutes = (configs: AppRouteConfig[]) => {
   return configs.map(({ path, element: Comp, authRequired, requiredAuthorities }) =>
      createRoute({
         getParentRoute: () => rootRoute,
         path,
         component: () => {
            const page = <Comp />
            return authRequired ? (
               <ProtectedRoute requiredAuthorities={requiredAuthorities}>{page}</ProtectedRoute>
            ) : (
               page
            )
         },
      }),
   )
}

const routeTree = rootRoute.addChildren(buildRoutes(appRoutes))

export const router = createRouter({
   routeTree,
})
