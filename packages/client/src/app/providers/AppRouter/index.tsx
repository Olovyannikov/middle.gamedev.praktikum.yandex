import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { router } from '@/shared/router';
import { PageLoader } from '@/shared/ui';
import { Error500PageLazy } from '@/pages/Error500/lazy';

export const AppRouter = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {Object.values(router).map((route) => (
                    <Route key={route.path} {...route} />
                ))}
                <Route path="*" element={<Error500PageLazy />} />
            </Routes>
        </Suspense>
    );
};
