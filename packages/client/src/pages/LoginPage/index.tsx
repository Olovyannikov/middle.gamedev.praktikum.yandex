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
import clsx from 'clsx';

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

    const REDIRECT_URI = 'http://localhost:3000';
    const urlGetOauthServiceId = `https://ya-praktikum.tech/api/v2/oauth/yandex/service-id?redirect_uri=${REDIRECT_URI}`;

    const onOauth = () => {
        console.log('onOauth');

        fetch(urlGetOauthServiceId)
            .then((response) => {
                console.log('response', response);

                return response.json();
            })
            .then((result) => {
                console.log('result', result.service_id);
                const CLIENT_ID = result.service_id;
                const urlOauth = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

                document.location.href = urlOauth;
            });
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
                                className={clsx([s.formButton, s['m-t-40']])}
                            >
                                Войти
                            </Button>
                            <Button
                                type="button"
                                variant={'contained'}
                                className={clsx([
                                    s.formButton,
                                    s['color-yandex-orange'],
                                ])}
                                onClick={onOauth}
                            >
                                Войти с Yandex
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
