import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router"
import { type AppRouteConfig, appRoutes } from "@/app/router/routes.ts"
import { ProtectedRoute } from "@/app/router/protected-route.tsx"
import { useAuthStore } from "@/features/auth/stores/auth-store.ts"
import { UserType } from "@/features/auth/types/auth.ts"
import { SpecialistLayout } from "@/app/layouts/specialist-layout.tsx"
import { AdminLayout } from "@/app/layouts/admin-layout.tsx"
import { ClientLayout } from "@/app/layouts/client-layout.tsx"
import { HomeLayout } from "@/app/layouts/home-layout.tsx"

const RootComponent = () => {
  const { user } = useAuthStore()

  const Layout = !user
    ? HomeLayout
    : user?.userType === UserType.CLIENT
      ? ClientLayout
      : user?.userType === UserType.SPECIALIST
        ? SpecialistLayout
        : AdminLayout

  return (
    <Layout>
      <Outlet />
    </Layout>
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
