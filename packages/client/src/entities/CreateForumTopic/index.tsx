import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Grid, Modal, Snackbar } from '@mui/material';
import { isError } from 'lodash-es';
import { useToggle } from 'usehooks-ts';

import { CreateTopic } from '@/features';
import { ForumCreatePostRequest } from '@/services/ForumService/Forum.dto';
import { useCreateTopicMutation } from '@/services/ForumService/Forum.service';
import { isErrorWithStatus } from '@/shared/types/guards/isError';
import { CreateTopicSchema } from '@/shared/validators/CreateTopic.schema';

export const CreateForumTopic = () => {
    const [isModalOpen, setIsModalOpen] = useToggle(false);
    const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useToggle(false);
    const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useToggle(false);
    const form = useForm<ForumCreatePostRequest>({
        resolver: zodResolver(CreateTopicSchema),
    });

    const [createTopic, { isError: isCreateTopicError, error, isSuccess, isLoading, data }] = useCreateTopicMutation();

    const submitForm = form.handleSubmit(async (data) => {
        try {
            const response = await createTopic(data);

            if (isErrorWithStatus(response)) {
                setIsErrorSnackbarOpen();
            }

            if (isCreateTopicError) {
                setIsErrorSnackbarOpen();
            }
        } catch (e: unknown) {
            if (isError(e)) {
                console.error(e);
            }
            setIsErrorSnackbarOpen();
        }
    });

    useEffect(() => {
        if (isSuccess) {
            setIsSuccessSnackbarOpen();
            setIsModalOpen();
            form.reset();
        }
    }, [isSuccess]);

    return (
        <>
            <Grid container alignItems='flex-end' justifyContent='flex-end'>
                <Button variant='contained' onClick={setIsModalOpen}>
                    Create topic
                </Button>
            </Grid>
            <Modal open={isModalOpen} onClose={setIsModalOpen}>
                <FormProvider {...form}>
                    <CreateTopic
                        onSubmit={submitForm}
                        isLoading={isLoading}
                        onAfterAction={() => {
                            setIsModalOpen();
                            form.reset();
                        }}
                    />
                </FormProvider>
            </Modal>
            <Snackbar open={isErrorSnackbarOpen} autoHideDuration={6000} onClose={setIsErrorSnackbarOpen}>
                <Alert severity='error'>Error when create a topic. Try again later.</Alert>
            </Snackbar>
            <Snackbar open={isSuccessSnackbarOpen} autoHideDuration={6000} onClose={setIsSuccessSnackbarOpen}>
                <Alert severity='success'>Topic &#34;{data?.title}&#34; was created.</Alert>
            </Snackbar>
        </>
    );
};
