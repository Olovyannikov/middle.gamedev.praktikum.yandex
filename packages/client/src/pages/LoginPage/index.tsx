import { RootLayout } from '@/layouts/RootLayout';
import { Container, Stack, Paper, Button, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormInputText } from '@/components/FormInputText';
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
                <Paper elevation={3} className={s.formWrapper}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
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
                        >
                            Submit
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </RootLayout>
    );
}
