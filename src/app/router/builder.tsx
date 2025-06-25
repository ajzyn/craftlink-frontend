import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router"
import { type AppRouteConfig, appRoutes } from "@/app/router/routes.ts"
import { ProtectedRoute } from "@/app/router/protected-route.tsx"
import { DefaultLayout } from "@/app/layouts/default-layout.tsx"

const RootComponent = () => {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
}

export const rootRoute = createRootRoute({
  component: RootComponent,
})
const buildRoutes = (configs: AppRouteConfig[]) => {
  return configs.map(({ path, element: Comp, isPrivate, requiredAuthorities }) =>
    createRoute({
      getParentRoute: () => rootRoute,
      path,
      component: () => {
        const page = <Comp />
        return isPrivate ? (
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
