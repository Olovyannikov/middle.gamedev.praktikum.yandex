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
import type { RequestError, ServiceIdResponse } from '@/shared/types/api';
import { Form } from '@/components/Form';
import { defaultValues } from '@/shared/constants/forms';
import { useNavigate } from 'react-router-dom';
import { FormStatusLine } from '@/components/FormStatusLine';
import { useAuth } from '@/shared/context/AuthContext';
import { useLazyGetServiceIdQuery } from '@/services/oauthApi';
import { redirectUri } from '@/shared/constants/api';
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

    const [
        getServiceId,
        { isLoading: isServiceIdLoading, isFetching: isServiceIdFetching },
    ] = useLazyGetServiceIdQuery();

    const onOAuth = async () => {
        if (isServiceIdLoading || isServiceIdFetching) return;

        const { data, isSuccess } = await getServiceId();

        if (isSuccess) {
            const { service_id } = data;
            document.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${redirectUri}`;
        }
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
