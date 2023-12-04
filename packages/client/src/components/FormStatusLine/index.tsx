import { Typography } from '@mui/material';
import s from '@/components/FormStatusLine/FormStatusLine.module.scss';

type FormStatusLineProps = {
    isUpdating?: boolean;
    isError?: boolean;
    error?: string;
};

export const FormStatusLine = ({
    isUpdating,
    isError,
    error,
}: FormStatusLineProps) => {
    return (
        <div>
            {isUpdating ? (
                <Typography variant="body1">Идёт запрос...</Typography>
            ) : null}
            {isError ? (
                <Typography variant="body1" className={s.formErrorMessage}>
                    Ошибка: {error}
                </Typography>
            ) : null}
        </div>
    );
};
