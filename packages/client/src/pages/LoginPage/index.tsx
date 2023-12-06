import { useEffect } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RootLayout } from '@/layouts/RootLayout';
import { Container, Button, Typography } from '@mui/material';
import { FormInputText } from '@/components/FormInputText';
import { FormPaperWrapper } from '@/components/FormPaperWrapper';
import { useSignInMutation } from '@/services/authApi';
import {
    LoginSchema,
    LoginSchemaType,
} from '@/shared/validators/UserValidation';
import type { RequestError } from '@/shared/types/api';
import { Form } from '@/components/Form';
import { defaultValues } from '@/shared/constants/forms';
import { useNavigate } from 'react-router-dom';
import { FormStatusLine } from '@/components/FormStatusLine';
import { useAuth } from '@/shared/context/AuthContext';

import s from './LoginPage.module.scss';

export default function LoginPage() {
    const methods = useForm<LoginSchemaType>({
        defaultValues: defaultValues.login,
        mode: 'onChange',
        resolver: zodResolver(LoginSchema),
    });

    const [signin, { isLoading: isUpdating, isError, error, isSuccess }] =
        useSignInMutation();
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) navigate('/me');
    }, [isAuth, isSuccess, error]);

    const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
        await signin(data);

        if (isSuccess) navigate('/me');
    };

    return (
        <RootLayout>
            <Container>
                <FormPaperWrapper>
                    <Typography variant="h4">Войти</Typography>
                    <FormProvider {...methods}>
                        <Form onSubmit={methods.handleSubmit(onSubmit)}>
                            <FormInputText label="Логин" name={'login'} />
                            <FormInputText
                                label="Пароль"
                                name={'password'}
                                type={'password'}
                            />
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                className={s.formButton}
                            >
                                Войти
                            </Button>
                        </Form>
                    </FormProvider>
                    <FormStatusLine
                        isUpdating={isUpdating}
                        isError={isError}
                        error={
                            error &&
                            'status' in error &&
                            (error.data as RequestError).reason
                        }
                    />
                </FormPaperWrapper>
            </Container>
        </RootLayout>
    );
}
