import { RootLayout } from '@/layouts/RootLayout';
import { Container, Button, Typography } from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { FormInputText } from '@/components/FormInputText';
import { FormPaperWrapper } from '@/components/FormPaperWrapper';
import { Form } from '@/components/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    RegistrationSchema,
    RegistrationSchemaType,
} from '@/shared/validators/UserValidation';
import s from './RegistrationPage.module.scss';

export default function RegistrationPage() {
    const methods = useForm<RegistrationSchemaType>({
        defaultValues: {
            login: '',
            password: '',
            first_name: '',
            second_name: '',
            phone: '',
            email: '',
        },
        mode: 'onChange',
        resolver: zodResolver(RegistrationSchema),
    });

    const onSubmit: SubmitHandler<RegistrationSchemaType> = (data) => {
        console.log(data);
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
                            <FormInputText label="Пароль" name={'password'} />
                            <FormInputText
                                label="Повторите пароль"
                                name={'confirmPassword'}
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
                </FormPaperWrapper>
            </Container>
        </RootLayout>
    );
}
