import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const isAuth = true;
    return isAuth ? children : <Navigate to={'/sign-in'} replace />;
};
