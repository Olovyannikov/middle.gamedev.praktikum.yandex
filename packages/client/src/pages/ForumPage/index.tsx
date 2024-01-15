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
import dayjs from 'dayjs';

import { CreateForumTopic } from '@/entities';
import { RootLayout } from '@/layouts/RootLayout';
import { useGetAllPostsQuery } from '@/services/ForumService/Forum.service';

export default function ForumPage() {
    const { data } = useGetAllPostsQuery();

    console.log(data);

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
                    <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Название топика</TableCell>
                                    <TableCell>Автор</TableCell>
                                    <TableCell>Дата публикации</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map((topic) => (
                                    <TableRow
                                        key={topic.id}
                                        sx={{
                                            '&:last-child td, &:last-child th': {
                                                border: 0,
                                            },
                                        }}
                                    >
                                        <TableCell>
                                            <Link to={`/topic/${topic.id}`}>{topic.title}</Link>
                                        </TableCell>
                                        <TableCell>{topic.author.name}</TableCell>
                                        <TableCell>{dayjs(topic.createdAt).format('DD MMM HH:mm a')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <CreateForumTopic />
                </Grid>
            </Grid>
        </RootLayout>
    );
}
