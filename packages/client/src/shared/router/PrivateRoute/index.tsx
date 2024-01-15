import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/shared/context/AuthContext';
import { PageLoader } from '@/shared/ui';

export const PrivateRoute = ({ children }: PropsWithChildren) => {
    const { isAuth, isLoading } = useAuth();

    if (isLoading) return <PageLoader />;
    return isAuth ? children : <Navigate to='/sign-in' replace />;
};
