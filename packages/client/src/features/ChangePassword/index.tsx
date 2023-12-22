import { Form } from '@/components/Form';
import { Container } from '@/shared/ui';
import cn from 'clsx';
import s from '@/pages/ProfilePage/profile.module.scss';
import { FormInputText } from '@/components/FormInputText';
import { Button } from '@mui/material';
import { FormStatusLine } from '@/components/FormStatusLine';
import { RequestError } from '@/shared/types/api';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { NewPasswordSchema, NewPasswordSchemaType } from '@/shared/validators/UserValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChangePasswordMutation } from '@/services/usersApi';
import { memo } from 'react';
import { useToggle } from 'usehooks-ts';

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
            console.log(response);
        }
    };

    return (
        <>
            <Button onClick={setShowChangePass}>Change password?</Button>
            <FormProvider {...methods}>
                <Form hidden={!showChangePass} onSubmit={methods.handleSubmit(onSubmitPassword)}>
                    <Container className={cn(s.password_section)}>
                        <FormInputText label='Пароль' name={'oldPassword'} type={'password'} />
                        <FormInputText label='Новый пароль' name={'newPassword'} type={'password'} />
                        <Button type='submit' variant={'contained'}>
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
