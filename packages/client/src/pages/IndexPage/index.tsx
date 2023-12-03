import { RootLayout } from '@/layouts/RootLayout';
import { AppLink, Container } from '@/shared/ui';
import { Banner } from '@/shared/ui/Banner';
import { DESCRIPTION, TITLE } from '../../../config';
import { Stack } from '@mui/material';
import s from '@/pages/GamePage/GamePage.module.scss';

export default function IndexPage() {
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
                <AppLink className={s.button} to="/game">
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
