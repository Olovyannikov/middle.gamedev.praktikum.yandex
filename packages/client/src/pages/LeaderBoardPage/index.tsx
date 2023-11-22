import { RootLayout } from '@/layouts/RootLayout';
import { Grid } from '@mui/material';

export default function LeaderBoardPage() {
    return (
        <RootLayout>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
                style={{ minHeight: '90vh' }}
            >
                <h1>Hello Leaderboard!</h1>
            </Grid>
        </RootLayout>
    );
}
