import { DIRECTIONS, GAME_STATE } from '@/widgets/Game/constants';

export type GameState = keyof typeof GAME_STATE;
export type Dir = keyof typeof DIRECTIONS;

export interface Position {
    x: number;
    y: number;
}

export interface Draw {
    ctx: CanvasRenderingContext2D;
    body?: Position[];
    food?: Position;
}

export interface RandomPositionOnGridArgs {
    gridSize?: number;
    threshold: number;
}

export interface WillSnakeHitTheFood {
    foodPosition: Position;
    snakeHeadPosition: Position;
    direction: Dir;
}
