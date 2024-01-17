import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Grid, Modal, Snackbar } from '@mui/material';
import { isError } from 'lodash-es';
import { useToggle } from 'usehooks-ts';

import { CreateTopic } from '@/features';
import type { ForumCreatePostRequest } from '@/services/ForumService/Forum.dto';
import { useCreateTopicMutation } from '@/services/ForumService/Forum.service';
import { isErrorWithStatus } from '@/shared/types/guards/isError';
import { CreateTopicSchema } from '@/shared/validators/CreateTopic.schema';

export const CreateForumTopic = () => {
    const [isModalOpen, setIsModalOpen] = useToggle(false);
    const [isErrorSnackbarOpen, setIsOpenErrorSnackbar] = useState(false);
    const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false);
    const form = useForm<ForumCreatePostRequest>({
        resolver: zodResolver(CreateTopicSchema),
    });

    const [createTopic, { isError: isCreateTopicError, error, isSuccess, isLoading, data }] = useCreateTopicMutation();

    const submitForm = form.handleSubmit(async (data) => {
        try {
            const response = await createTopic(data);

            if (isErrorWithStatus(response)) {
                setIsOpenErrorSnackbar(true);
            }

            if (isCreateTopicError) {
                setIsOpenErrorSnackbar(true);
            }
        } catch (e: unknown) {
            if (isError(e)) {
                console.error(e);
            }
            setIsOpenErrorSnackbar(true);
        }
    });

    const onSnackbarCloseHandler = (snackbarCb: (b: false) => void) => snackbarCb(false);

    useEffect(() => {
        if (isSuccess) {
            setIsSuccessSnackbarOpen(true);
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
            <Snackbar
                open={isErrorSnackbarOpen}
                autoHideDuration={6000}
                onClose={() => onSnackbarCloseHandler(setIsOpenErrorSnackbar)}
            >
                <Alert severity='error'>Error when create a topic. Try again later.</Alert>
            </Snackbar>
            <Snackbar
                open={isSuccessSnackbarOpen}
                autoHideDuration={6000}
                onClose={() => onSnackbarCloseHandler(setIsSuccessSnackbarOpen)}
            >
                <Alert severity='success'>Topic &#34;{data?.title}&#34; was created.</Alert>
            </Snackbar>
        </>
    );
};
