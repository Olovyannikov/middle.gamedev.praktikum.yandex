import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { router } from '@/shared/router';
import { PageLoader } from '@/shared/ui';
import { Error500PageLazy } from '@/pages/Error500/lazy';
import { PrivateRoute } from '@/shared/router/PrivateRoute';

export const AppRouter = () => {
    const isAuth = true;

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {Object.values(router).map((route) => (
                    <Route
                        key={route.path}
                        element={
                            <PrivateRoute
                                isAuth={isAuth}
                                isNeedAuth={route.path}
                            />
                        }
                    >
                        <Route key={route.path} {...route} />
                    </Route>
                ))}
                <Route path="*" element={<Error500PageLazy />} />
            </Routes>
        </Suspense>
    );
};
