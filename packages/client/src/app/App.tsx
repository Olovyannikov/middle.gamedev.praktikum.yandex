import { useEffect } from 'react';

import { AppRouter } from '@/app/providers/AppRouter';

import './assets/styles/index.scss';

export const App = () => {
    useEffect(() => {
        const fetchServerData = async () => {
            // const url = `http://localhost:${__SERVER_PORT__}/api/auth`;
            await fetch(`http://localhost:${__SERVER_PORT__}/api/topic`, {
                credentials: 'include',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: 'Test title',
                    text: 'Text text text Text text text Text text text',
                }),
            });
            await fetch(`http://localhost:${__SERVER_PORT__}/api/topic`, {
                credentials: 'include',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: 'Test title 2',
                    text: 'Text text text Text text text Text text text',
                }),
            });
            await fetch(`http://localhost:${__SERVER_PORT__}/api/comment`, {
                credentials: 'include',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: 'Comment 1',
                    topic: 1,
                }),
            });
            await fetch(`http://localhost:${__SERVER_PORT__}/api/comment`, {
                credentials: 'include',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: 'Comment 2',
                    topic: 1,
                }),
            });
            await fetch(`http://localhost:${__SERVER_PORT__}/api/comment`, {
                credentials: 'include',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: 'Comment for comment',
                    topic: 1,
                    parentComment: 1,
                }),
            });
            // const data = await response.text();
            //console.log(data);
            //
            // const url2 = `http://localhost:${__SERVER_PORT__}/api/user`;
            // const response2 = await fetch(url2, {
            //     credentials: 'include',
            //     method: 'get',
            // });
            // const data2 = await response2.json();
            // console.log(data2);
        };

        setTimeout(() => {
            fetchServerData();
        }, 2000);
    }, []);

    return <AppRouter />;
};
