import { RootLayout } from '@/layouts/RootLayout';
import { Banner } from '../../shared/ui/Banner';
import { Stack } from '@mui/material';
import { AppLink } from '@/shared/ui';

import btnStyle from '../../shared/ui/Button/Button.module.scss';

export default function GamePage() {
    const title = 'The Snake';
    const description = `
        The snake game is a classic video game where the player controls a snake 
        that moves around a grid or screen. The objective of the game is to eat food items 
        that appear randomly on the grid, which causes the snake to grow longer
    `;

    const btnClassName = [
        btnStyle.button,
        btnStyle.bordered,
        btnStyle['t-1'],
    ].join(' ');

    return (
        <RootLayout hasHeader={false}>
            <Banner title={title} description={description} />
            <Stack
                sx={{
                    maxWidth: '275px',
                    margin: '95px auto 50px',
                }}
                spacing={3.2}
            >
                <AppLink className={btnClassName} to="#">
                    Start
                </AppLink>
                <AppLink className={btnClassName} to="/me">
                    Profile
                </AppLink>
                <AppLink className={btnClassName} to="/forum">
                    Forum
                </AppLink>
                <AppLink className={btnClassName} to="/leaderboard">
                    Leaderboard
                </AppLink>
            </Stack>
        </RootLayout>
    );
}
