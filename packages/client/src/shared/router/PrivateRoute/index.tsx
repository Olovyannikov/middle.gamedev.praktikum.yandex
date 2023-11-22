import { Navigate, Outlet } from 'react-router-dom';

const noNeedAuthPaths = ['/sign-in', '/sign-up'];

export const PrivateRoute = ({
    isAuth,
    isNeedAuth,
    children,
}: {
    isAuth: boolean;
    isNeedAuth?: string;
    children?: any;
}) => {
    const noNeedAuth = isNeedAuth
        ? noNeedAuthPaths.includes(isNeedAuth)
        : 'Oops! Something wrong.';

    if (noNeedAuth === 'Oops! Something wrong.') {
        return console.error(noNeedAuth);
    }

    if (noNeedAuth && isAuth) {
        return <Navigate to={'/'} replace />;
    }

    if (!noNeedAuth && !isAuth) {
        return <Navigate to={'/sign-in'} replace />;
    }

    return children ? children : <Outlet />;
};
