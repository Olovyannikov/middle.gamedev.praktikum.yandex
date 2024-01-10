import { useEffect } from 'react';

import { AppRouter } from '@/app/providers/AppRouter';

import './assets/styles/index.scss';

export const App = () => {
    useEffect(() => {
        const fetchServerData = async () => {
            const url = `http://localhost:${__SERVER_PORT__}/api/auth`;
            const response = await fetch(url, {
                credentials: 'include',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: 'radada',
                    password: 'Qwerty123',
                }),
            });
            const data = await response.text();
            console.log(data);

            const url2 = `http://localhost:${__SERVER_PORT__}/api/topic`;
            const response2 = await fetch(url2, {
                credentials: 'include',
                method: 'get',
            });
            const data2 = await response2.json();
            console.log(data2);
        };

        fetchServerData();
    }, []);

    return <AppRouter />;
};
