import { RootLayout } from '@/layouts/RootLayout';
import { Banner } from '../../shared/ui/Banner';
import { Stack } from '@mui/material';
import { AppLink } from '@/shared/ui/AppLink';
import { TITLE, DESCRIPTION } from '../../../config';

import s from './GamePage.module.scss';

export default function GamePage() {
    return (
        <RootLayout hasHeader={false}>
            <Banner title={TITLE} description={DESCRIPTION} />
            <Stack
                sx={{
                    maxWidth: '275px',
                    margin: '95px auto 50px',
                }}
                spacing={3.2}
            >
                <AppLink className={s.button} to="#">
                    Start
                </AppLink>
                <AppLink className={s.button} to="/me">
                    Profile
                </AppLink>
                <AppLink className={s.button} to="/forum">
                    Forum
                </AppLink>
                <AppLink className={s.button} to="/leaderboard">
                    Leaderboard
                </AppLink>
            </Stack>
        </RootLayout>
    );
}
