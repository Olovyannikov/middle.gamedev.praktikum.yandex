import { memo, useRef, useState } from 'react';
import { Button, Typography } from '@mui/material';

import { Canvas, StartScreen } from '@/entities';

import { GAME_STATE } from './constants';
import { draw } from './lib';
import type { GameState } from './types';
import { useGame } from './useGame';

import s from './Game.module.scss';

export const Game = memo(() => {
    const [gameState, setGameState] = useState<GameState>(GAME_STATE.INIT);
    const onGameOver = () => setGameState(GAME_STATE.GAME_OVER);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { snakeBody, foodPos, onSnakeMove, score } = useGame({
        width: canvasRef?.current?.width,
        height: canvasRef?.current?.height,
        gameState,
        onGameOver,
        setGameState,
    });
    const onDrawHandler = (ctx: CanvasRenderingContext2D) => draw({ ctx, body: snakeBody, food: foodPos });

    return (
        <div className={s.root} tabIndex={0} onKeyDown={onSnakeMove}>
            {gameState !== GAME_STATE.INIT && <Typography mb={2}>Total score: {score}</Typography>}
            <StartScreen gameState={gameState} setGameState={setGameState} />
            {(gameState === GAME_STATE.RUNNING || gameState === GAME_STATE.PAUSED) && (
                <>
                    <Canvas ref={canvasRef} draw={onDrawHandler} />
                    <Button
                        onClick={() => {
                            setGameState(gameState === GAME_STATE.RUNNING ? GAME_STATE.PAUSED : GAME_STATE.RUNNING);
                        }}
                    >
                        {gameState === GAME_STATE.RUNNING ? 'pause' : 'play'}
                    </Button>
                </>
            )}
        </div>
    );
});

Game.displayName = 'Game';
