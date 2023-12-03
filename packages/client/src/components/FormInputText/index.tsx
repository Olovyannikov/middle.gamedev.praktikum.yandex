import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import s from './FormInputText.module.scss';

interface FormInputTextProps {
    name: string;
    label: string;
    setValue?: unknown;
    type?: string;
}

export const FormInputText = ({ name, label, type }: FormInputTextProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <TextField
                    helperText={error ? error.message : null}
                    error={!!error}
                    variant={'standard'}
                    className={s.textField}
                    inputRef={ref}
                    label={label}
                    fullWidth
                    type={type}
                    {...field}
                />
            )}
        />
    );
};
