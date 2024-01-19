import { useEffect, useRef } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Button, Grid, Snackbar, TextareaAutosize } from '@mui/material';

import { Form } from '@/components/Form';
import type { CreateCommentRequest } from '@/services/ForumService/Forum.dto';
import { useCreateCommentMutation } from '@/services/ForumService/Forum.service';

interface CreateCommentProps {
    parent?: string | null;
}

const fullWidth = { width: '100%' };
const textArea = { width: '100%', minHeight: 150, padding: 16 };

export const CreateComment = ({ parent = null }: CreateCommentProps) => {
    const textFieldRef = useRef<HTMLTextAreaElement | null>(null);
    const { topicId } = useParams();
    const form = useForm<CreateCommentRequest>({
        defaultValues: {
            text: '',
        },
    });
    const [createComment, { isLoading, isSuccess }] = useCreateCommentMutation();

    const onSubmit = form.handleSubmit(async (data) => {
        if (topicId) {
            try {
                await createComment({
                    text: data.text,
                    parentComment: parent,
                    topicId,
                }).unwrap();
            } catch (e: unknown) {
                console.error(e);
            }
        }
    });

    useEffect(() => {
        if (isSuccess) {
            form.reset();
            textFieldRef.current?.focus();
        }
    }, [isSuccess]);

    return (
        <>
            <FormProvider {...form}>
                <Form onSubmit={onSubmit} style={fullWidth}>
                    <Grid
                        gap={1}
                        container
                        sx={fullWidth}
                        direction='column'
                        alignItems='flex-end'
                        justifyContent='flex-end'
                    >
                        <Controller
                            name='text'
                            render={({ field }) => (
                                <TextareaAutosize {...field} ref={textFieldRef} autoFocus style={textArea} />
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
