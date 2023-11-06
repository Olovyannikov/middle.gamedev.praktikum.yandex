import { useEffect } from 'react';
import './assets/styles/index.scss';
import { IndexPage } from '@/pages/IndexPage';

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
    return <IndexPage />;
};
