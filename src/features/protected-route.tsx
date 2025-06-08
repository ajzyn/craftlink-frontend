import {Navigate} from '@tanstack/react-router';
import {useAuth} from "@/features/use-auth.tsx";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredAuthorities?: string[];
}


export const ProtectedRoute = ({
                                   children,
                                   requiredAuthorities = [],
                               }: ProtectedRouteProps) => {
    const {user} = useAuth();

    if (!user) return <Navigate to="/login"/>;
    if (
        requiredAuthorities.length > 0 &&
        !requiredAuthorities.some((auth) => user.authorities.includes(auth))
    ) {
        return <div>Brak dostępu</div>;
    }

    return <>{children}</>;
};
