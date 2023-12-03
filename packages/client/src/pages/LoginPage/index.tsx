import { RootLayout } from '@/layouts/RootLayout';
import { Container, Button, Typography } from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { FormInputText } from '@/components/FormInputText';
import { FormPaperWrapper } from '@/components/FormPaperWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetUserQuery, useSignInMutation } from '@/services/authApi';
import {
    LoginSchema,
    LoginSchemaType,
} from '@/shared/validators/UserValidation';
import { Form } from '@/components/Form';
import { defaultValues } from '@/shared/constants/forms';
import s from './LoginPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { FormStatusLine } from '@/components/FormStatusLine';

export default function LoginPage() {
    const methods = useForm<LoginSchemaType>({
        defaultValues: defaultValues.login,
        mode: 'onChange',
        resolver: zodResolver(LoginSchema),
    });

    const [signin, { isLoading: isUpdating, isError, error }] =
        useSignInMutation();
    const { refetch } = useGetUserQuery();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
        const result = await signin(data);
        if (result?.error?.data.indexOf('User already in system') > 0)
            navigate('/me');
        if ('data' in result) {
            const user = await refetch();
            if (user.isSuccess && user.data) navigate('/me');
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
                                className={s.formButton}
                            >
                                Войти
                            </Button>
                        </Form>
                    </FormProvider>
                    <FormStatusLine
                        isUpdating={isUpdating}
                        isError={isError}
                        error={error?.data?.reason}
                    />
                </FormPaperWrapper>
            </Container>
        </RootLayout>
    );
}
