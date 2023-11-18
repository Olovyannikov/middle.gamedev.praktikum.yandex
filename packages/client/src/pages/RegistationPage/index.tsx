import { RootLayout } from '@/layouts/RootLayout';
import { Container, Button, Typography } from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { FormInputText } from '@/components/FormInputText';
import { FormPaperWrapper } from '@/components/FormPaperWrapper';
import { Form } from '@/components/Form';
import s from './RegistrationPage.module.scss';

interface RegistrationParams {
    login: string;
    password: string;
    first_name: string;
    second_name: string;
    phone: string;
    email: string;
}

export default function RegistrationPage() {
    const methods = useForm<RegistrationParams>({
        defaultValues: {
            login: '',
            password: '',
            first_name: '',
            second_name: '',
            phone: '',
            email: '',
        },
    });

    const onSubmit: SubmitHandler<RegistrationParams> = (data) => {
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
                                name={'repeatPassword'}
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
