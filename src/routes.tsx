import {createRootRoute, createRoute, createRouter, Outlet} from '@tanstack/react-router';
import {type AppRouteConfig, appRoutes} from "@/features/routes-config.ts";
import {ProtectedRoute} from "@/features/protected-route.tsx";

const rootRoute = createRootRoute({
    component: () => <Outlet/>,
});


const buildRoutes = (configs: AppRouteConfig[]) => {
    return configs.map(({path, element: Comp, isPrivate, requiredAuthorities}) =>
        createRoute({
            getParentRoute: () => rootRoute,
            path,
            component: () => {
                const page = <Comp/>;
                return isPrivate
                    ? (
                        <ProtectedRoute requiredAuthorities={requiredAuthorities}>
                            {page}
                        </ProtectedRoute>
                    )
                    : page;
            },
        })
    );
}

const routeTree = rootRoute.addChildren(buildRoutes(appRoutes));

export const router = createRouter({
    routeTree,
});