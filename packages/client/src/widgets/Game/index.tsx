import { useRef, useState } from 'react';
import { GAME_STATE, GameState } from '@/shared/types/models/Game';
import { Canvas } from '@/entities/Canvas';

import s from './Game.module.scss';
import { Button } from '@mui/material';
import { StartScreen } from '@/entities';

export const Game = () => {
    const [gameState, setGameState] = useState<GameState>(GAME_STATE.GAME_OVER);
    const onGameOver = () => setGameState(GAME_STATE.GAME_OVER);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    return (
        <div className={s.root}>
            <StartScreen gameState={gameState} setGameState={setGameState} />
            {(gameState === GAME_STATE.RUNNING ||
                gameState === GAME_STATE.PAUSED) && (
                <>
                    <Canvas
                        ref={canvasRef}
                        draw={() => {
                            console.log('draw');
                        }}
                    />
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
