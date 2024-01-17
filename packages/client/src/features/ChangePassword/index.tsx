import { memo } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import cn from 'clsx';
import { useToggle } from 'usehooks-ts';

import { Form } from '@/components/Form';
import { FormInputText } from '@/components/FormInputText';
import { FormStatusLine } from '@/components/FormStatusLine';
import { useChangePasswordMutation } from '@/services/UserService/User.service';
import type { RequestError } from '@/shared/types/api';
import { Container } from '@/shared/ui';
import { NewPasswordSchema, type NewPasswordSchemaType } from '@/shared/validators/UserValidation';

import s from './ChangePassword.module.scss';

export const ChangePassword = memo(() => {
    const [showChangePass, setShowChangePass] = useToggle(false);

    const [changePassword, { isLoading: isPasswordUpdating, isError: isPasswordError, error: passwordError }] =
        useChangePasswordMutation();

    const methods = useForm<NewPasswordSchemaType>({
        mode: 'onChange',
        resolver: zodResolver(NewPasswordSchema),
    });

    const onSubmitPassword: SubmitHandler<NewPasswordSchemaType> = async (data) => {
        const response = await changePassword(data);
        if ('error' in response) {
            console.error(response);
        }
    };

    return (
        <>
            <Button onClick={setShowChangePass}>Change password?</Button>
            <FormProvider {...methods}>
                <Form hidden={!showChangePass} onSubmit={methods.handleSubmit(onSubmitPassword)}>
                    <Container className={s.password_section}>
                        <FormInputText label='Пароль' name='oldPassword' type='password' />
                        <FormInputText label='Новый пароль' name='newPassword' type='password' />
                        <Button type='submit' variant='contained'>
                            Change password
                        </Button>
                        <FormStatusLine
                            isUpdating={isPasswordUpdating}
                            isError={isPasswordError}
                            error={
                                passwordError && 'status' in passwordError
                                    ? (passwordError.data as RequestError).reason
                                    : ''
                            }
                        />
                    </Container>
                </Form>
            </FormProvider>
        </>
    );
});

ChangePassword.displayName = 'ChangePassword';
