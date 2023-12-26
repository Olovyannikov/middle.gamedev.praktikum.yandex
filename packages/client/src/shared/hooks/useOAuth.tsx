import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSignInUpWithYandexMutation } from '@/services/oauthApi';
import { redirectUri } from '../constants/api';

import { YandexRequest } from '../types/api';

export const useOAuth = (isAuth: boolean): void => {
    const [signInUpWithYandex] = useSignInUpWithYandexMutation();
    const { search } = useLocation();
    const code = new URLSearchParams(search).get('code');

    const requestYandex = async (data: YandexRequest) => {
        await signInUpWithYandex(data);
    };

    useEffect(() => {
        if (!isAuth && code) {
            const data = { code, redirect_uri: redirectUri };
            requestYandex(data);
        }
    }, []);
};
