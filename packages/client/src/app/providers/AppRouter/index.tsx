import { Route, Routes } from 'react-router-dom';

import Error500 from '@/pages/Error500';
import { router } from '@/shared/router';

export const AppRouter = () => (
    <Routes>
        {Object.values(router).map((route) => (
            <Route key={route.path} {...route} />
        ))}
        <Route path='*' element={<Error500 />} />
    </Routes>
);
