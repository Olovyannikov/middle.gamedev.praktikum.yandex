import { useEffect } from 'react';
import { RootLayout } from '@/layouts/RootLayout';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Grid, Typography, Divider, TextareaAutosize } from '@mui/material';
import { Button } from '@/shared/ui';

export default function ForumTopicPage() {
    let { id } = useParams();

    return (
        <RootLayout>
            {!id && <Navigate to="/forum" replace={true} />}
            <Grid
                container
                alignItems="center"
                justifyContent="center"
                direction="column"
                sx={{ minWidth: '100%', padding: 1 }}
                gap={2}
            >
                <Typography variant="h3">Topic {id}</Typography>
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    sx={{ width: '90%' }}
                    gap={2}
                >
                    {new Array(5).fill(1).map((_, id) => {
                        return (
                            <Typography key={id} variant="subtitle1">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Voluptatum similique
                                temporibus amet tempore, placeat perferendis
                                saepe, voluptas architecto rerum aut quidem. Vel
                                quibusdam eos ullam esse, doloremque assumenda
                                adipisci modi?
                            </Typography>
                        );
                    })}
                    <Divider
                        sx={{ width: '100%' }}
                        textAlign="left"
                        component="li"
                        light
                    >
                        <Typography variant="h6">Comments</Typography>
                    </Divider>

                    <Grid
                        direction="column"
                        container
                        alignItems="flex-start"
                        justifyContent="flex-start"
                        gap={2}
                    >
                        {['Jamssk11', 'dajq7'].map((el) => {
                            return (
                                <Grid
                                    direction="column"
                                    container
                                    alignItems="flex-start"
                                    justifyContent="flex-start"
                                    gap={1}
                                    key={el}
                                >
                                    <Typography variant="h6">{el}</Typography>
                                    <Typography variant="subtitle1">
                                        temporibus amet tempore, placeat
                                        perferendis saepe, voluptas architecto
                                        rerum aut quidem. Vel quibusdam eos
                                        ullam esse, doloremque assumenda
                                        adipisci modi?
                                    </Typography>
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Divider
                        sx={{ width: '100%' }}
                        textAlign="left"
                        component="li"
                        light
                    >
                        <Typography variant="h6">Leave comment</Typography>
                    </Divider>
                    <Grid
                        container
                        sx={{ width: '100%' }}
                        alignItems="flex-end"
                        justifyContent="flex-end"
                        gap={1}
                        direction="column"
                    >
                        <TextareaAutosize
                            style={{ width: '100%', minHeight: 150 }}
                        />
                        <Button type="button">Send</Button>
                    </Grid>
                </Grid>
            </Grid>
        </RootLayout>
    );
}
