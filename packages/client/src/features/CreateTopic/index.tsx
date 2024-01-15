import { Controller, useFormContext } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import { Form } from '@/components/Form';

import s from './CreateTopic.module.scss';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: 'calc(100vh - 40px)',
    overflowY: 'auto',
};

interface CreateTopicProps {
    isLoading: boolean;
    onSubmit: () => void;
    onAfterAction?: () => void;
}

export const CreateTopic = ({ onAfterAction, onSubmit, isLoading }: CreateTopicProps) => {
    const {
        formState: { isValid },
    } = useFormContext();

    return (
        <Box sx={style}>
            <Form className={s.form} onSubmit={onSubmit}>
                <Controller
                    name='title'
                    render={({ field }) => (
                        <TextField required autoFocus fullWidth label='Topic theme' variant='outlined' {...field} />
                    )}
                />
                <Controller
                    name='text'
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            required
                            label='Write first message...'
                            multiline
                            minRows={4}
                            maxRows={20}
                            variant='outlined'
                            {...field}
                        />
                    )}
                />
                <div className={s.actions}>
                    <Button type='button' variant='outlined' onClick={onAfterAction}>
                        Cancel
                    </Button>
                    <LoadingButton
                        disabled={isLoading || !isValid}
                        loading={isLoading}
                        type='submit'
                        variant='contained'
                    >
                        Create
                    </LoadingButton>
                </div>
            </Form>
        </Box>
    );
};
