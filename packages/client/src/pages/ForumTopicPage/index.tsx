import { Navigate, useParams } from 'react-router-dom';
import { Divider, Grid, Typography } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';

import { CreateComment } from '@/features';
import { RootLayout } from '@/layouts/RootLayout';
import { useGetCommentsByPostIdQuery, useGetPostByIdQuery } from '@/services/ForumService/Forum.service';

export default function ForumTopicPage() {
    const { topicId } = useParams();
    const { data } = useGetPostByIdQuery(topicId ?? skipToken);
    const { data: comments } = useGetCommentsByPostIdQuery(topicId ?? skipToken);

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
                    {comments && comments?.length > 0 && (
                        <Grid direction='column' container alignItems='flex-start' justifyContent='flex-start' gap={2}>
                            {comments?.map((el) => (
                                <Grid
                                    direction='column'
                                    container
                                    alignItems='flex-start'
                                    justifyContent='flex-start'
                                    gap={1}
                                    key={el.id}
                                >
                                    <Typography variant='h6'>{el.text}</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                    <Divider sx={{ width: '100%' }} textAlign='left' component='li' light>
                        <Typography variant='h6'>Leave comment</Typography>
                    </Divider>
                    <CreateComment />
                </Grid>
            </Grid>
        </RootLayout>
    );
}
