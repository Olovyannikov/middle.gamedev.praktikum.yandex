import { Suspense, useEffect } from 'react';
import { AppRouter } from '@/app/providers/AppRouter';

import './assets/styles/index.scss';

export const App = () => {
    useEffect(() => {
        const fetchServerData = async () => {
            const url = `http://localhost:${__SERVER_PORT__}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
        };

        fetchServerData();
    }, []);
    return (
        <Suspense fallback="Loading translations...">
            <AppRouter />
        </Suspense>
    );
};
