import { Stack } from '@mui/material';
import cn from 'clsx';

import { RootLayout } from '@/layouts/RootLayout';
import { useAuth } from '@/shared/context/AuthContext';
import { useIsDarkMode } from '@/shared/hooks/useIsDarkMode';
import { useOAuth } from '@/shared/hooks/useOAuth';
import { RouterPaths } from '@/shared/router';
import { AppLink, Banner } from '@/shared/ui';

import { BASE_STACK_LAYOUT, DESCRIPTION, TITLE } from './config';

import s from './IndexPage.module.scss';

export default function IndexPage() {
    const isDarkMode = useIsDarkMode();
    const { isAuth } = useAuth();
    useOAuth(isAuth);

    const btnClassName = cn(s.button, isDarkMode && s.darkButton);

    return (
        <RootLayout hasHeader={false}>
            <Banner title={TITLE} description={DESCRIPTION} />
            <Stack sx={BASE_STACK_LAYOUT} spacing={3.2}>
                <AppLink className={btnClassName} to={RouterPaths.game}>
                    Start
                </AppLink>
                <AppLink className={btnClassName} to={isAuth ? RouterPaths.profile : RouterPaths.login}>
                    {isAuth ? 'Profile' : 'Sign in'}
                </AppLink>
                <AppLink className={btnClassName} to={RouterPaths.forum}>
                    Forum
                </AppLink>
            </Stack>
        </RootLayout>
    );
}
