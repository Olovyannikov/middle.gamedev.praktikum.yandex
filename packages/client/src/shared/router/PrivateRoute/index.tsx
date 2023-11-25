import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = () => {
    const isAuth = true;
    return isAuth ? <Outlet /> : <Navigate to={'/sign-in'} replace />;
};
