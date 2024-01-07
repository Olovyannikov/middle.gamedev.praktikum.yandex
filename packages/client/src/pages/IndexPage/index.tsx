import { Stack } from '@mui/material';

import { RootLayout } from '@/layouts/RootLayout';
import { useAuth } from '@/shared/context/AuthContext';
import { useOAuth } from '@/shared/hooks/useOAuth';
import { RouterPaths } from '@/shared/router';
import { AppLink, Banner } from '@/shared/ui';

import { BASE_STACK_LAYOUT, DESCRIPTION, TITLE } from './config';

import s from './IndexPage.module.scss';

export default function IndexPage() {
    const { isAuth } = useAuth();

    useOAuth(isAuth);

    return (
        <RootLayout hasHeader={false}>
            <Banner title={TITLE} description={DESCRIPTION} />
            <Stack sx={BASE_STACK_LAYOUT} spacing={3.2}>
                <AppLink className={s.button} to={RouterPaths.game}>
                    Start
                </AppLink>
                <AppLink className={s.button} to={isAuth ? RouterPaths.profile : RouterPaths.registration}>
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
