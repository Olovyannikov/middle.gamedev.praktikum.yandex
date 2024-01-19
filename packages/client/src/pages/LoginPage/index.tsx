import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Container, Typography } from '@mui/material';
import clsx from 'clsx';
import { useIsClient } from 'usehooks-ts';

import { Form } from '@/components/Form';
import { FormInputText } from '@/components/FormInputText';
import { FormPaperWrapper } from '@/components/FormPaperWrapper';
import { FormStatusLine } from '@/components/FormStatusLine';
import { RootLayout } from '@/layouts/RootLayout';
import { useSignInMutation } from '@/services/AuthService/AuthService';
import { useLazyGetServiceIdQuery } from '@/services/OAuthService/OAuth.service';
import { redirectUri } from '@/shared/constants/api';
import { defaultValues } from '@/shared/constants/forms';
import { useAuth } from '@/shared/context/AuthContext';
import type { RequestError } from '@/shared/types/api';
import { LoginSchema, type LoginSchemaType } from '@/shared/validators/UserValidation';

import s from './LoginPage.module.scss';

export default function LoginPage() {
    const isClient = useIsClient();
    const methods = useForm<LoginSchemaType>({
        defaultValues: defaultValues.login,
        mode: 'onChange',
        resolver: zodResolver(LoginSchema),
    });

    const [signin, { isLoading: isUpdating, isError, error, isSuccess }] = useSignInMutation();
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) navigate('/me');
    }, [isAuth, isSuccess, error]);

    const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
        await signin(data);

        if (isSuccess) navigate('/me');
    };

    const [getServiceId, { isLoading: isServiceIdLoading, isFetching: isServiceIdFetching }] =
        useLazyGetServiceIdQuery();

    const onOAuth = async () => {
        if (isServiceIdLoading || isServiceIdFetching) return;

        const { data, isSuccess } = await getServiceId();

        if (isSuccess) {
            const { service_id } = data;
            document.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${
                isClient ? window.location.origin : redirectUri
            }`;
        }
    };

    return (
        <RootLayout>
            <Container>
                <FormPaperWrapper>
                    <Typography variant='h4'>Войти</Typography>
                    <FormProvider {...methods}>
                        <Form onSubmit={methods.handleSubmit(onSubmit)}>
                            <FormInputText label='Логин' name='login' />
                            <FormInputText label='Пароль' name='password' type='password' />
                            <Button type='submit' variant='contained' className={clsx([s.formButton, s['m-t-40']])}>
                                Войти
                            </Button>
                            <Button
                                type='button'
                                variant='contained'
                                className={clsx([s.formButton, s.oauth])}
                                onClick={onOAuth}
                            >
                                Войти с Yandex
                            </Button>
                        </Form>
                    </FormProvider>
                    <FormStatusLine
                        isUpdating={isUpdating}
                        isError={isError}
                        error={error && 'status' in error && (error.data as RequestError).reason}
                    />
                </FormPaperWrapper>
            </Container>
        </RootLayout>
    );
}
