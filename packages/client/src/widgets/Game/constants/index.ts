import { getRandomInt } from '@/shared/lib/getRandomInt';

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

export const GAME_CONTROLS = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    KEY_W: 'KeyW',
    KEY_S: 'KeyS',
    KEY_A: 'KeyA',
    KEY_D: 'KeyD',
    SPACE: 'Space',
};

const DIRECTIONS_KEYS = Object.keys(DIRECTIONS);

export const DIRECTIONS_COUNT = DIRECTIONS_KEYS.length - 1;

export const SETUP_POSITION =
    DIRECTIONS[
        DIRECTIONS_KEYS[
            getRandomInt(0, DIRECTIONS_COUNT)
        ] as keyof typeof DIRECTIONS
    ];

export const SEGMENT_SIZE = 5;
