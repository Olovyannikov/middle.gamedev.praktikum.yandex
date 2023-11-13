import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

interface FormInputTextProps {
    name: string;
    control: any;
    label: string;
    setValue?: unknown;
}

export function FormInputText({ name, control, label }: FormInputTextProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    variant={'standard'}
                    value={value}
                    label={label}
                />
            )}
        />
    );
}
