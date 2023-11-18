import { Control, Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

interface FormInputTextProps {
    name: string;
    label: string;
    setValue?: unknown;
}

export const FormInputText = ({ name, label }: FormInputTextProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    variant={'standard'}
                    value={value}
                    label={label}
                    fullWidth
                />
            )}
        />
    );
};
