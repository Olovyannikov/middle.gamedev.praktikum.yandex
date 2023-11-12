import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { Card, Container, Flex, Typography, Button } from '@/shared/ui';

import s from './StartScreen.module.scss';

export const StartScreen = () => {
    const [isStarted, setIsStarted] = useState(false);

    return (
        <section>
            <Container className={s.container}>
                <Flex align="center" justify="center" className={s.start}>
                    <Card className={s.card}>
                        <main className={s.content}>
                            {isStarted ? (
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
                                        remainingTime === 0 &&
                                        setIsStarted(false)
                                    }
                                >
                                    {({ remainingTime }) => remainingTime}
                                </CountdownCircleTimer>
                            ) : (
                                <>
                                    <Typography variant="h1">Snake</Typography>
                                    <Typography variant="h1">🐍</Typography>
                                    <div className={s.controls}>
                                        <Button
                                            onClick={() => setIsStarted(true)}
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
