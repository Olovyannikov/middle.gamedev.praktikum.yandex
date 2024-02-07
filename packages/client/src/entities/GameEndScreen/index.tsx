import { Button, Typography } from '@mui/material';
import s from './GameEndScreen.module.scss';
import { GameState } from '@/widgets/Game/types';
import { GAME_STATE } from '@/widgets/Game/constants';

export const GameEndScreen = ({ setGameState }: { setGameState: (state: GameState) => void }) => {
    const handleStart = () => {
        setGameState(GAME_STATE.RUNNING);
    };

    return (
        <>
            <Typography mb={2} variant='h2' component='h1'>
                Game Over
            </Typography>
            <Typography variant='h2'>🐍</Typography>
            <div className={s.content}>
                <Button onClick={handleStart}>Retry</Button>
                <Button href='/'>Back to main</Button>
                <Button href='/results'>Results</Button>
            </div>
        </>
    );
};
