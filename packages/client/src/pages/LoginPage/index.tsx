import { RootLayout } from '@/layouts/RootLayout';
import { Container, Button, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormInputText } from '@/components/FormInputText';
import { FormPaperWrapper } from '@/components/FormPaperWrapper';
import s from './LoginPage.module.scss';

interface LoginParams {
    login: string;
    password: string;
}

export default function LoginPage() {
    const { handleSubmit, control } = useForm<LoginParams>({
        defaultValues: {
            login: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<LoginParams> = (data) => {
        console.log(data);
    };

    return (
        <RootLayout>
            <Container>
                <FormPaperWrapper>
                    <Typography variant="h4">Войти</Typography>
                    <FormInputText
                        control={control}
                        label="Логин"
                        name={'login'}
                    />
                    <FormInputText
                        control={control}
                        label="Пароль"
                        name={'password'}
                    />
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        variant={'contained'}
                        className={s.formButton}
                    >
                        Войти
                    </Button>
                </FormPaperWrapper>
            </Container>
        </RootLayout>
    );
}
