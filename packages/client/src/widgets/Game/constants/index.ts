export const GAME_STATE = {
    RUNNING: 'RUNNING',
    PAUSED: 'PAUSED',
    GAME_OVER: 'GAME_OVER',
    PREPARE: 'PREPARE',
} as const;

export const DIRECTIONS = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
} as const;

export const SEGMENT_SIZE = 5;
