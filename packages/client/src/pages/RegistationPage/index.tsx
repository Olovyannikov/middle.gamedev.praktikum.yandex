import { RootLayout } from '@/layouts/RootLayout';
import { Container, Button, Typography } from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { FormInputText } from '@/components/FormInputText';
import { FormPaperWrapper } from '@/components/FormPaperWrapper';
import { Form } from '@/components/Form';
import { FormStatusLine } from '@/components/FormStatusLine';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    RegistrationSchema,
    RegistrationSchemaType,
} from '@/shared/validators/UserValidation';
import { defaultValues } from '@/shared/constants/forms';
import s from './RegistrationPage.module.scss';
import { useSignUpMutation } from '@/services/authApi';
import { useNavigate } from 'react-router-dom';

export default function RegistrationPage() {
    const methods = useForm<RegistrationSchemaType>({
        defaultValues: defaultValues.registration,
        mode: 'onChange',
        resolver: zodResolver(RegistrationSchema),
    });

    const [signup, { isLoading: isUpdating, isError, error }] =
        useSignUpMutation();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegistrationSchemaType> = async (data) => {
        delete data.confirmPassword;
        const result = await signup(data);
        if ('data' in result) navigate('/sign-in');
    };

    return (
        <RootLayout>
            <Container>
                <FormPaperWrapper>
                    <Typography variant="h4">Зарегистрироваться</Typography>
                    <FormProvider {...methods}>
                        <Form onSubmit={methods.handleSubmit(onSubmit)}>
                            <FormInputText label="Логин" name={'login'} />
                            <FormInputText label="Имя" name={'first_name'} />
                            <FormInputText
                                label="Фамилия"
                                name={'second_name'}
                            />
                            <FormInputText label="Телефон" name={'phone'} />
                            <FormInputText label="E-mail" name={'email'} />
                            <FormInputText
                                label="Пароль"
                                name={'password'}
                                type={'password'}
                            />
                            <FormInputText
                                label="Повторите пароль"
                                name={'confirmPassword'}
                                type={'password'}
                            />
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                className={s.formButton}
                            >
                                Зарегистрироваться
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
