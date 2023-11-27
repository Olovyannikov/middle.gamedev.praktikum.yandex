import { useRef, useState } from 'react';
import { Button } from '@mui/material';

import { StartScreen, Canvas } from '@/entities';

import type { GameState } from './types';
import { GAME_STATE } from './constants';
import { draw } from './lib';
import { useGame } from './useGame';

import s from './Game.module.scss';

export const Game = () => {
    const [gameState, setGameState] = useState<GameState>(GAME_STATE.GAME_OVER);
    const onGameOver = () => setGameState(GAME_STATE.GAME_OVER);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { snakeBody, foodPos, onSnakeMove, resetGameState } = useGame({
        width: canvasRef?.current?.width,
        height: canvasRef?.current?.height,
        gameState,
        onGameOver,
        setGameState,
    });
    const onDrawHandler = (ctx: CanvasRenderingContext2D) =>
        draw({ ctx, body: snakeBody, food: foodPos });

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex,jsx-a11y/no-static-element-interactions
        <div className={s.root} tabIndex={0} onKeyDown={onSnakeMove}>
            <StartScreen gameState={gameState} setGameState={setGameState} />
            {(gameState === GAME_STATE.RUNNING ||
                gameState === GAME_STATE.PAUSED) && (
                <>
                    <Canvas ref={canvasRef} draw={onDrawHandler} />
                    <Button
                        onClick={() => {
                            setGameState(
                                gameState === GAME_STATE.RUNNING
                                    ? GAME_STATE.PAUSED
                                    : GAME_STATE.RUNNING
                            );
                        }}
                    >
                        {gameState === GAME_STATE.RUNNING ? 'pause' : 'play'}
                    </Button>
                </>
            )}
        </div>
    );
};
