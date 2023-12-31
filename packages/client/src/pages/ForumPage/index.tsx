import { RootLayout } from '@/layouts/RootLayout';
import { Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ForumPage() {
    return (
        <RootLayout>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
                sx={{ minWidth: '100%', padding: 1 }}
            >
                <Typography variant="h4" sx={{ padding: '20px 0' }}>
                    Snake's forum page
                </Typography>
                <Grid
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: '90%' }}
                >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Название топика</TableCell>
                                    <TableCell>Автор</TableCell>
                                    <TableCell>Дата создания</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell>
                                        <Link to="/topic/1">
                                            Как не умереть за первые 10 секунд
                                        </Link>
                                    </TableCell>
                                    <TableCell>jxSolo</TableCell>
                                    <TableCell>02.03.2023</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Grid
                        container
                        alignItems="flex-end"
                        justifyContent="flex-end"
                    >
                        <Button component={Link} to="/create/topic">
                            Create topic
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </RootLayout>
    );
}
