import { Route, Routes } from 'react-router-dom';

import { router } from '@/shared/router';
import Error500 from '@/pages/Error500';

export const AppRouter = () => {
    return (
        <Routes>
            {Object.values(router).map((route) => (
                <Route key={route.path} {...route} />
            ))}
            <Route path='*' element={<Error500 />} />
        </Routes>
    );
};
