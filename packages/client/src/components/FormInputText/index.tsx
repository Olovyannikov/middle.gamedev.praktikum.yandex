import { Control, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

interface FormInputTextProps {
    name: string;
    control: Control | unknown;
    label: string;
    setValue?: unknown;
}

export const FormInputText = ({ name, control, label }: FormInputTextProps) => {
    return (
        <Controller
            name={name}
            control={control as Control}
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
