import { Typography } from '@mui/material';

interface FormStatusLineProps {
    isUpdating?: boolean;
    isError?: boolean;
    error?: string | false;
}

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
                <Typography variant="body1">Ошибка: {error}</Typography>
            ) : null}
        </div>
    );
};
