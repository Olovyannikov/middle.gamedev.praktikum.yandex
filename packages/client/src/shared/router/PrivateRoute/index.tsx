import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useGetUserQuery } from '@/services/authApi';

interface PrivateRouteProps {
    children: ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { data } = useGetUserQuery();

    return data ? children : <Navigate to={'/sign-in'} replace />;
};
