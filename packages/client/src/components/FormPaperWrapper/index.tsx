import { Stack, Paper } from '@mui/material';
import s from './FormPaperWrapper.module.scss';
import { ReactNode } from 'react';

type FormPaperWrapperProps = {
    children: ReactNode;
};

export const FormPaperWrapper = ({ children }: FormPaperWrapperProps) => {
    return (
        <Paper elevation={3} className={s.formWrapper}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                className={s.formStack}
            >
                {children}
            </Stack>
        </Paper>
    );
};
