import { Link } from 'react-router-dom';
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

import { RootLayout } from '@/layouts/RootLayout';

export default function ForumPage() {
    return (
        <RootLayout>
            <Grid
                container
                alignItems='center'
                justifyContent='center'
                direction='column'
                sx={{ minWidth: '100%', padding: 1 }}
            >
                <Typography variant='h4' sx={{ padding: '20px 0' }}>
                    The Snake. Forum.
                </Typography>
                <Grid alignItems='center' justifyContent='center' sx={{ width: '90%' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
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
                                        <Link to='/topic/1'>Как не умереть за первые 10 секунд</Link>
                                    </TableCell>
                                    <TableCell>jxSolo</TableCell>
                                    <TableCell>02.03.2023</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Grid container alignItems='flex-end' justifyContent='flex-end'>
                        <Button component={Link} to='/create/topic'>
                            Create topic
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </RootLayout>
    );
}
