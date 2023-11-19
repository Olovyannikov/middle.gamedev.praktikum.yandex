export const GAME_STATE = {
    RUNNING: 'RUNNING',
    PAUSED: 'PAUSED',
    GAME_OVER: 'GAME_OVER',
    PREPARE: 'PREPARE',
} as const;

export type GameState = keyof typeof GAME_STATE;
