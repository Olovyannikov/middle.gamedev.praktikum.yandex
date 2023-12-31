import { RootLayout } from '@/layouts/RootLayout';
import { Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './leaderboard.module.css';

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
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                >
                    <h1>Leaderboard for</h1>
                    <div className={styles.textBadgeUI}>Today</div>
                </Grid>

                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="flex-start"
                    style={{ minHeight: '90vh' }}
                    sx={{ width: '80vw' }}
                >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="leaderboard">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Place</TableCell>
                                    <TableCell>Player</TableCell>
                                    <TableCell>Points</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>Jumanji</TableCell>
                                    <TableCell>202920</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2</TableCell>
                                    <TableCell>Natahtari</TableCell>
                                    <TableCell>182981</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </RootLayout>
    );
}
