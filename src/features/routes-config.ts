import {type ComponentType, lazy, type LazyExoticComponent} from 'react';
import {lazyRouteComponent} from "@tanstack/react-router";

export interface AppRouteConfig {
    path: string;
    element: ComponentType | LazyExoticComponent<ComponentType>;
    isPrivate?: boolean;
    requiredAuthorities?: string[];
}

export const appRoutes: AppRouteConfig[] = [
    {
        path: '/',
        element: lazy(() => import('@/features/home/page.tsx')),
        isPrivate: true,
        requiredAuthorities: ['ADMIN'],
    },
    {
        path: '/register',
        element: lazyRouteComponent(() => import('./client-auth/page'))
    },
];