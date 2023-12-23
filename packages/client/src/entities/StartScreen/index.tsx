import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { Card, Container } from '@/shared/ui';

import type { GameState } from '@/widgets/Game/types';
import { GAME_STATE } from '@/widgets/Game/constants';
import { GameEndScreen } from '../GameEndScreen';
import { Button, Stack, Typography } from '@mui/material';
import s from './StartScreen.module.scss';

export const StartScreen = ({
    gameState,
    setGameState,
}: {
    gameState: GameState;
    setGameState: (state: GameState) => void;
}) => {
    if (gameState === GAME_STATE.RUNNING || gameState === GAME_STATE.PAUSED)
        return null;

    return (
        <section className={s.root}>
            <Container>
                <Stack alignItems="center" justifyContent="center">
                    <Card className={s.card}>
                        <main className={s.content}>
                            {gameState === GAME_STATE.PREPARE && (
                                <CountdownCircleTimer
                                    isPlaying
                                    duration={3}
                                    colors={[
                                        '#004777',
                                        '#F7B801',
                                        '#A30000',
                                        '#A30000',
                                    ]}
                                    colorsTime={[3, 2, 1, 0]}
                                    onUpdate={(remainingTime) =>
                                        remainingTime === 0
                                    }
                                    onComplete={() =>
                                        setGameState(GAME_STATE.RUNNING)
                                    }
                                >
                                    {({ remainingTime }) => remainingTime}
                                </CountdownCircleTimer>
                            )}
                            {gameState === GAME_STATE.GAME_OVER && (
                                <GameEndScreen setGameState={setGameState} />
                            )}
                            {gameState === GAME_STATE.INIT && (
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Typography variant="h1">
                                        The Snake
                                    </Typography>
                                    <Typography variant="h2">🐍</Typography>

                                    <Button
                                        onClick={() =>
                                            setGameState(GAME_STATE.PREPARE)
                                        }
                                    >
                                        Play!
                                    </Button>
                                </Stack>
                            )}
                        </main>
                    </Card>
                </Stack>
            </Container>
        </section>
    );
};
