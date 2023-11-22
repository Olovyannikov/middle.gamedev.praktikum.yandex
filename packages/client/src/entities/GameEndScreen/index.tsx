import { Button, Typography } from '@mui/material';
import s from './GameEndScreen.module.scss';
import { GameState } from '@/widgets/Game/types';
import { GAME_STATE } from '@/widgets/Game/constants';

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
