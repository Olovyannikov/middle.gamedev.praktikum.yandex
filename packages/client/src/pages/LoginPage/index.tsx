import { RootLayout } from '@/layouts/RootLayout';
import { Container, Button, Typography } from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { FormInputText } from '@/components/FormInputText';
import { FormPaperWrapper } from '@/components/FormPaperWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    LoginSchema,
    LoginSchemaType,
} from '@/shared/validators/UserValidation';
import s from './LoginPage.module.scss';

export default function LoginPage() {
    const methods = useForm<LoginSchemaType>({
        defaultValues: {
            login: '',
            password: '',
        },
        mode: 'onChange',
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
        console.log(data);
    };

    return (
        <RootLayout>
            <Container>
                <FormPaperWrapper>
                    <Typography variant="h4">Войти</Typography>
                    <FormProvider {...methods}>
                        <form
                            onSubmit={methods.handleSubmit(onSubmit)}
                            className={s.form}
                        >
                            <FormInputText label="Логин" name={'login'} />
                            <FormInputText label="Пароль" name={'password'} />
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                className={s.formButton}
                            >
                                Войти
                            </Button>
                        </form>
                    </FormProvider>
                </FormPaperWrapper>
            </Container>
        </RootLayout>
    );
}
