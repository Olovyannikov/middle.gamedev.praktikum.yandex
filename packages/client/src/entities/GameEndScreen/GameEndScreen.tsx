import { Button, Typography } from '@mui/material';
import s from './StartScreen.module.scss';
import { GameState } from '@/shared/types/models/Game';
import { GAME_STATE } from '@/shared/types/models/Game';

export const GameEndScreen = ({
    setGameState,
}: {
    setGameState: (state: GameState) => void;
}) => {
    const handleStart = () => {
        setGameState(GAME_STATE.RUNNING);
    };

    return (
        <>
            <Typography variant="h1">Game Over</Typography>
            <Typography variant="h1">🐍</Typography>
            <div className={s.content}>
                <Button onClick={handleStart}>Retry</Button>
                <Button href="/">Back to main</Button>
                <Button href="/results">Results</Button>
            </div>
        </>
    );
};
