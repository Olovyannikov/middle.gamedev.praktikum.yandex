import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Container, Typography } from '@mui/material';

import { Form } from '@/components/Form';
import { FormInputText } from '@/components/FormInputText';
import { FormPaperWrapper } from '@/components/FormPaperWrapper';
import { FormStatusLine } from '@/components/FormStatusLine';
import { RootLayout } from '@/layouts/RootLayout';
import { useSignUpMutation } from '@/services/AuthService/AuthService';
import { defaultValues } from '@/shared/constants/forms';
import { useAuth } from '@/shared/context/AuthContext';
import { RequestError } from '@/shared/types/api';
import { RegistrationSchema, RegistrationSchemaType } from '@/shared/validators/UserValidation';

import s from './RegistrationPage.module.scss';

export default function RegistrationPage() {
    const { isAuth } = useAuth();

    const methods = useForm<RegistrationSchemaType>({
        defaultValues: defaultValues.registration,
        mode: 'onChange',
        resolver: zodResolver(RegistrationSchema),
    });

    const [signup, { isLoading: isUpdating, isError, error }] = useSignUpMutation();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegistrationSchemaType> = async (data) => {
        delete data.confirmPassword;
        const result = await signup(data);
        if ('data' in result) navigate('/sign-in');
    };

    const hasError = error && 'status' in error && (error.data as RequestError).reason;

    if (isAuth) {
        return <Navigate to='/me' />;
    }

    return (
        <RootLayout>
            <Container>
                <FormPaperWrapper>
                    <Typography variant='h4'>Зарегистрироваться</Typography>
                    <FormProvider {...methods}>
                        <Form onSubmit={methods.handleSubmit(onSubmit)}>
                            <FormInputText label='Логин' name='login' />
                            <FormInputText label='Имя' name='first_name' />
                            <FormInputText label='Фамилия' name='second_name' />
                            <FormInputText label='Телефон' name='phone' />
                            <FormInputText label='E-mail' name='email' />
                            <FormInputText label='Пароль' name='password' type='password' />
                            <FormInputText label='Повторите пароль' name='confirmPassword' type='password' />
                            <Button type='submit' variant='contained' className={s.formButton}>
                                Зарегистрироваться
                            </Button>
                        </Form>
                    </FormProvider>
                    <FormStatusLine isUpdating={isUpdating} isError={isError} error={hasError} />
                </FormPaperWrapper>
            </Container>
        </RootLayout>
    );
}
