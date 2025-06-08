import '@tanstack/react-router'

declare module '@tanstack/react-router' {
    interface DefaultRouteMeta {
        requiresAuth: boolean
        allowedRoles?: UserRole[]
    }
}
