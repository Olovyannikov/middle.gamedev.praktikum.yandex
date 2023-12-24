import { type KeyboardEvent, useEffect, useState } from 'react';
import { useInterval, useLockedBody } from 'usehooks-ts';

import { DIRECTIONS, GAME_STATE, SEGMENT_SIZE } from '@/widgets/Game/constants';
import { createSnakeMove, hasSnakeEatenItself, randomPositionOnGrid, willSnakeHitTheFood } from '@/widgets/Game/lib';
import type { Dir, GameState, Position } from '@/widgets/Game/types';

const MOVE_SPEED = 100;

interface UseGameProps {
    onGameOver: () => void;
    gameState: GameState;
    setGameState: (state: GameState) => void;
    width?: number;
    height?: number;
}

export const useGame = ({ width, height, onGameOver, gameState, setGameState }: UseGameProps) => {
    const [bodyLocked, setBodyLocked] = useLockedBody(false);
    const [speed, setSpeed] = useState(MOVE_SPEED);
    const [dir, setDir] = useState<Dir>();
    const [snakeBody, setSnakeBody] = useState<Position[] | undefined>([
        {
            x: randomPositionOnGrid({
                threshold: width ?? 0,
                gridSize: SEGMENT_SIZE,
            }),
            y: randomPositionOnGrid({
                threshold: height ?? 0,
                gridSize: SEGMENT_SIZE,
            }),
        },
    ]);
    const [foodPos, setFoodPos] = useState<Position>({
        x: randomPositionOnGrid({
            threshold: width ?? 0,
            gridSize: SEGMENT_SIZE,
        }),
        y: randomPositionOnGrid({
            threshold: height ?? 0,
            gridSize: SEGMENT_SIZE,
        }),
    });

    const head = snakeBody?.[snakeBody.length - 1];

    const { moveUp, moveLeft, moveRight, moveDown } = createSnakeMove();

    const onSnakeMove = (e: KeyboardEvent) => {
        switch (e.code) {
            case 'KeyW':
                return dir !== DIRECTIONS.DOWN && setDir(DIRECTIONS.UP);
            case 'KeyA':
                return dir !== DIRECTIONS.RIGHT && setDir(DIRECTIONS.LEFT);
            case 'KeyS':
                return dir !== DIRECTIONS.UP && setDir(DIRECTIONS.DOWN);
            case 'KeyD':
                return dir !== DIRECTIONS.LEFT && setDir(DIRECTIONS.RIGHT);
            case 'ArrowUp':
                return dir !== DIRECTIONS.DOWN && setDir(DIRECTIONS.UP);
            case 'ArrowDown':
                return dir !== DIRECTIONS.UP && setDir(DIRECTIONS.DOWN);
            case 'ArrowLeft':
                return dir !== DIRECTIONS.RIGHT && setDir(DIRECTIONS.LEFT);
            case 'ArrowRight':
                return dir !== DIRECTIONS.LEFT && setDir(DIRECTIONS.RIGHT);
            case 'Space':
                return gameState === GAME_STATE.RUNNING
                    ? setGameState(GAME_STATE.PAUSED)
                    : setGameState(GAME_STATE.RUNNING);
            default:
                setDir(DIRECTIONS.RIGHT);
        }
    };

    const moveSnake = () => {
        let snakeAfterMove: Position[] | undefined;

        switch (dir) {
            case DIRECTIONS.UP:
                if (head && head.y > 0) {
                    snakeAfterMove = moveUp(snakeBody ?? []);
                } else if (head && width && head?.x > width / 2) {
                    setDir(DIRECTIONS.LEFT);
                } else {
                    setDir(DIRECTIONS.RIGHT);
                }
                break;
            case DIRECTIONS.DOWN:
                if (head && height && head.y < height - SEGMENT_SIZE) {
                    snakeAfterMove = moveDown(snakeBody ?? []);
                } else if (head && width && head.x > width / 2) {
                    setDir(DIRECTIONS.LEFT);
                } else {
                    setDir(DIRECTIONS.RIGHT);
                }
                break;
            case DIRECTIONS.LEFT:
                if (head && head.x > 0) {
                    snakeAfterMove = moveLeft(snakeBody ?? []);
                } else if (head && height && head.y < height / 2) {
                    setDir(DIRECTIONS.DOWN);
                } else {
                    setDir(DIRECTIONS.UP);
                }
                break;
            case DIRECTIONS.RIGHT:
                if (head && width && head.x < width - SEGMENT_SIZE) {
                    snakeAfterMove = moveRight(snakeBody ?? []);
                } else if (head && height && head.y < height / 2) {
                    setDir(DIRECTIONS.DOWN);
                } else {
                    setDir(DIRECTIONS.UP);
                }
                break;
            default:
                setDir(DIRECTIONS.RIGHT);
        }

        if (snakeAfterMove) {
            const isGameOver = hasSnakeEatenItself(snakeAfterMove);
            if (isGameOver) {
                onGameOver();
            }
        }

        if (
            dir !== undefined &&
            snakeAfterMove &&
            foodPos &&
            willSnakeHitTheFood({
                foodPosition: foodPos,
                snakeHeadPosition: head ?? { x: 0, y: 0 },
                direction: dir,
            })
        ) {
            setSnakeBody([...snakeAfterMove, { x: foodPos.x, y: foodPos.y }]);

            setFoodPos({
                x: randomPositionOnGrid({
                    threshold: width ?? 0,
                }),
                y: randomPositionOnGrid({ threshold: height ?? 0 }),
            });
        } else if (snakeAfterMove) {
            setSnakeBody(snakeAfterMove);
        }
    };

    const resetGameState = () => {
        setDir(undefined);
        setFoodPos({
            x: randomPositionOnGrid({
                gridSize: SEGMENT_SIZE,
                threshold: width ?? 0,
            }),
            y: randomPositionOnGrid({
                gridSize: SEGMENT_SIZE,
                threshold: height ?? 0,
            }),
        });

        setSnakeBody([
            {
                x: randomPositionOnGrid({
                    gridSize: SEGMENT_SIZE,
                    threshold: width ?? 0,
                }),
                y: randomPositionOnGrid({
                    gridSize: SEGMENT_SIZE,
                    threshold: height ?? 0,
                }),
            },
        ]);
    };

    useInterval(moveSnake, gameState === GAME_STATE.RUNNING ? speed : null);

    useEffect(() => {
        if (!width || !height) return;

        setFoodPos({
            x: randomPositionOnGrid({
                gridSize: SEGMENT_SIZE,
                threshold: width ?? 0,
            }),
            y: randomPositionOnGrid({
                gridSize: SEGMENT_SIZE,
                threshold: height ?? 0,
            }),
        });

        setSnakeBody([
            {
                x: randomPositionOnGrid({
                    gridSize: SEGMENT_SIZE,
                    threshold: width ?? 0,
                }),
                y: randomPositionOnGrid({
                    gridSize: SEGMENT_SIZE,
                    threshold: height ?? 0,
                }),
            },
        ]);
    }, [width, height]);

    useEffect(() => {
        if (gameState === GAME_STATE.RUNNING) {
            return setBodyLocked(true);
        }

        return setBodyLocked(false);
    }, [gameState]);

    useEffect(() => {
        if (bodyLocked) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }, [bodyLocked]);

    useEffect(() => {
        if (snakeBody && snakeBody?.length % 5 === 0) {
            setSpeed((speed) => speed - 10);
        }
    }, [snakeBody?.length]);

    const total = snakeBody && snakeBody.length > 1 ? snakeBody.length : 0;

    return {
        score: total * 5,
        foodPos,
        snakeBody,
        onSnakeMove,
        resetGameState,
    };
};
