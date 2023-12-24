import { useEffect } from 'react';
import { Stack } from '@mui/material';
import { RootLayout } from '@/layouts/RootLayout';

import { AppLink, Banner } from '@/shared/ui';
import { useAuth } from '@/shared/context/AuthContext';
import { RouterPaths } from '@/shared/router';
import { DESCRIPTION, TITLE, BASE_STACK_LAYOUT } from './config';

import s from './IndexPage.module.scss';

export default function IndexPage() {
    const { isAuth } = useAuth();

    console.log({ isAuth });

    useEffect(() => {
        console.log(window.location.search);
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        console.log(code);

        if (code) {
            const urlOauth = 'https://ya-praktikum.tech/api/v2/oauth/yandex';
            const data = {
                code,
                redirect_uri: 'http://localhost:3000',
            };

            console.log(data);

            fetch(urlOauth, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(data),
            }).then((response) => {
                if (response.ok) {
                    console.log('oauth/yandex', 'ok');

                    const urlGetAuthUser =
                        'https://ya-praktikum.tech/api/v2/auth/user';

                    fetch(urlGetAuthUser)
                        .then((response) => {
                            return response.json();
                        })
                        .then((result) => {
                            console.log(result);
                        })
                        .catch((err) => {});
                }
            });
        }
    }, []);

    return (
        <RootLayout hasHeader={false}>
            <Banner title={TITLE} description={DESCRIPTION} />
            <Stack sx={BASE_STACK_LAYOUT} spacing={3.2}>
                <AppLink className={s.button} to={RouterPaths.game}>
                    Start
                </AppLink>
                <AppLink
                    className={s.button}
                    to={isAuth ? RouterPaths.profile : RouterPaths.registration}
                >
                    {isAuth ? 'Profile' : 'Register'}
                </AppLink>
                <AppLink className={s.button} to={RouterPaths.forum}>
                    Forum
                </AppLink>
                <AppLink className={s.button} to={RouterPaths.leaderboard}>
                    Leaderboard
                </AppLink>
            </Stack>
        </RootLayout>
    );
}
