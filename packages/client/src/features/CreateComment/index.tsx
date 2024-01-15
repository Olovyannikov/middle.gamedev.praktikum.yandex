import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Button, Grid, Snackbar, TextareaAutosize } from '@mui/material';

import { Form } from '@/components/Form';
import { CreateCommentRequest } from '@/services/ForumService/Forum.dto';
import { useCreateCommentMutation } from '@/services/ForumService/Forum.service';

interface CreateCommentProps {
    parent?: string | null;
}

export const CreateComment = ({ parent = null }: CreateCommentProps) => {
    const { topicId } = useParams();
    const form = useForm<CreateCommentRequest>();
    const [createComment, { isLoading, isSuccess }] = useCreateCommentMutation();

    console.log(topicId);

    const onSubmit = form.handleSubmit(async (data) => {
        if (topicId) {
            try {
                await createComment({
                    text: data.text,
                    parentComment: parent,
                    topicId,
                });
            } catch (e: unknown) {
                console.error(e);
            }
        }
    });

    return (
        <>
            <FormProvider {...form}>
                <Form onSubmit={onSubmit} style={{ width: '100%' }}>
                    <Grid
                        container
                        sx={{ width: '100%' }}
                        alignItems='flex-end'
                        justifyContent='flex-end'
                        gap={1}
                        direction='column'
                    >
                        <Controller
                            name='text'
                            render={({ field }) => (
                                <TextareaAutosize {...field} style={{ width: '100%', minHeight: 150, padding: 16 }} />
                            )}
                        />
                        <LoadingButton loading={isLoading} type='submit'>
                            Send
                        </LoadingButton>
                    </Grid>
                </Form>
            </FormProvider>
            <Snackbar open={isSuccess} autoHideDuration={3000}>
                <Alert severity='success'>Comment was added.</Alert>
            </Snackbar>
        </>
    );
};
