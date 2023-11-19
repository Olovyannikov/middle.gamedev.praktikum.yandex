import { Button } from '@mui/material';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { Card, Container, Flex, Typography } from '@/shared/ui';

import type { GameState } from '@/shared/types/models/Game';
import { GAME_STATE } from '@/shared/types/models/Game';

import s from './StartScreen.module.scss';
import { GameEndScreen } from '../GameEndScreen/GameEndScreen';

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
                            {gameState === GAME_STATE.GAME_OVER && (
                                <GameEndScreen setGameState={setGameState} />
                            )}
                        </main>
                    </Card>
                </Flex>
            </Container>
        </section>
    );
};
