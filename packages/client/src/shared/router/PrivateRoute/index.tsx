import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useGetUserQuery } from '@/services/authApi';

interface PrivateRouteProps {
    children: ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { data, isLoading } = useGetUserQuery();
    if (isLoading) return null;
    return data ? children : <Navigate to={'/sign-in'} replace />;
};
