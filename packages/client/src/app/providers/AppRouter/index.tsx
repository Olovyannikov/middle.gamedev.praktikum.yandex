import { Route, Routes } from 'react-router-dom';

import Error from '@/pages/ErrorPage';
import { router } from '@/shared/router';

export const AppRouter = () => (
    <Routes>
        {Object.values(router).map((route) => (
            <Route key={route.path} {...route} />
        ))}
        <Route path='*' element={<Error />} />
    </Routes>
);
