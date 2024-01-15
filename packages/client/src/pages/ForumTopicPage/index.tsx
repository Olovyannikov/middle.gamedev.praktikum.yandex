import { Navigate, useParams } from 'react-router-dom';
import { Button, Divider, Grid, TextareaAutosize, Typography } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';

import { RootLayout } from '@/layouts/RootLayout';
import { useGetPostByIdQuery } from '@/services/ForumService/Forum.service';

export default function ForumTopicPage() {
    const { topicId } = useParams();
    const { data } = useGetPostByIdQuery(topicId ?? skipToken);

    if (!topicId) {
        return <Navigate to='/forum' replace />;
    }

    return (
        <RootLayout>
            <Grid
                container
                alignItems='center'
                justifyContent='center'
                direction='column'
                sx={{ minWidth: '100%', padding: 1 }}
                gap={2}
            >
                <Typography variant='h3'>{data?.title}</Typography>
                <Grid container alignItems='center' justifyContent='center' sx={{ width: '90%' }} gap={2}>
                    <Typography variant='subtitle1'>{data?.text}</Typography>
                    <Divider sx={{ width: '100%' }} textAlign='left' component='li' light>
                        <Typography variant='h6'>Comments</Typography>
                    </Divider>

                    <Grid direction='column' container alignItems='flex-start' justifyContent='flex-start' gap={2}>
                        {['Jamssk11', 'dajq7'].map((el) => (
                            <Grid
                                direction='column'
                                container
                                alignItems='flex-start'
                                justifyContent='flex-start'
                                gap={1}
                                key={el}
                            >
                                <Typography variant='h6'>{el}</Typography>
                                <Typography variant='subtitle1'>
                                    temporibus amet tempore, placeat perferendis saepe, voluptas architecto rerum aut
                                    quidem. Vel quibusdam eos ullam esse, doloremque assumenda adipisci modi?
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                    <Divider sx={{ width: '100%' }} textAlign='left' component='li' light>
                        <Typography variant='h6'>Leave comment</Typography>
                    </Divider>
                    <Grid
                        container
                        sx={{ width: '100%' }}
                        alignItems='flex-end'
                        justifyContent='flex-end'
                        gap={1}
                        direction='column'
                    >
                        <TextareaAutosize style={{ width: '100%', minHeight: 150 }} />
                        <Button type='button'>Send</Button>
                    </Grid>
                </Grid>
            </Grid>
        </RootLayout>
    );
}
