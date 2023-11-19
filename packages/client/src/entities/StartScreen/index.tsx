import { Button } from '@mui/material';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { Card, Container, Flex, Typography } from '@/shared/ui';

import type { GameState } from '@/widgets/Game/types';
import { GAME_STATE } from '@/widgets/Game/constants';
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
            <Container className={s.container}>
                <Flex align="center" justify="center" className={s.start}>
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
                            {/* TODO: Тут должен быть экран конца игры */}
                            {gameState === GAME_STATE.GAME_OVER && (
                                <>
                                    {/* TODO: взять типографику из MUI */}
                                    <Typography variant="h1">Snake</Typography>
                                    <Typography variant="h1">🐍</Typography>
                                    <div className={s.controls}>
                                        <Button
                                            onClick={() =>
                                                setGameState(GAME_STATE.PREPARE)
                                            }
                                        >
                                            Start
                                        </Button>
                                    </div>
                                </>
                            )}
                        </main>
                    </Card>
                </Flex>
            </Container>
        </section>
    );
};
