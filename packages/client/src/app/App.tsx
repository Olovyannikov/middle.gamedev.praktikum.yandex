import { useEffect } from 'react';

import { AppRouter } from '@/app/providers/AppRouter';

import './assets/styles/index.scss';

export const App = () => {
    useEffect(() => {
        const fetchServerData = async () => {
            //EXAMPLE TODO: remove
            // const url = `http://localhost:${__SERVER_PORT__}`;
            // await fetch(`${url}/api/topic`, {
            //     credentials: 'include',
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         title: 'Test title',
            //         text: 'Text text text Text text text Text text text',
            //     }),
            // });
            // await fetch(`${url}/api/topic`, {
            //     credentials: 'include',
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         title: 'Test title 2',
            //         text: 'Text text text Text text text Text text text',
            //     }),
            // });
            // await fetch(`${url}/api/comment`, {
            //     credentials: 'include',
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         text: 'Comment 1',
            //         topic: 1,
            //     }),
            // });
            // await fetch(`${url}/api/comment`, {
            //     credentials: 'include',
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         text: 'Comment 2',
            //         topic: 1,
            //     }),
            // });
            // await fetch(`${url}/api/comment`, {
            //     credentials: 'include',
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         text: 'Comment for comment',
            //         topic: 1,
            //         parentComment: 1,
            //     }),
            // });
        };

        setTimeout(() => {
            fetchServerData();
        }, 2000);
    }, []);

    return <AppRouter />;
};
