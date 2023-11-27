import cn from 'clsx';
import { RootLayout } from '@/layouts/RootLayout';
import { ChangeEvent, useState } from 'react';
import s from './profile.module.scss';
import imgAvatar from '@/app/assets/img/avatar_default.svg';
import backgroundMain from '@/app/assets/img/bg.svg';
import { Container } from '@/shared/ui';
import { Form } from '@/components/Form';
import { FormInputText } from '@/components/FormInputText';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
    NewPasswordSchemaType,
    NewPasswordSchema,
} from '@/shared/validators/UserValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';

export default function ProfilePage() {
    const methods = useForm<NewPasswordSchemaType>({
        mode: 'onChange',
        resolver: zodResolver(NewPasswordSchema),
    });

    const [username, setUsername] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [showChangePass, setShowChangePass] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(imgAvatar);
    const [previewAvatar, setPreviewAvatar] = useState(imgAvatar);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onSubmitPassword: SubmitHandler<NewPasswordSchemaType> = (data) => {
        console.log(data);
    };

    const handleOpenChangePassword = () => {
        setShowChangePass(!showChangePass);
    };

    const handleSubmitAvatar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsModalOpen(false);
        setAvatarUrl(previewAvatar);
    };

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        setIsModalOpen(true);
        file && setPreviewAvatar(URL.createObjectURL(file));
    };

    return (
        <RootLayout>
            <Container className={cn(s.profile_container)}>
                <img
                    src={backgroundMain}
                    alt="background"
                    className={cn(s.main_background)}
                ></img>

                <Form
                    className={cn(s.form_avatar)}
                    onSubmit={handleSubmitAvatar}
                >
                    {!isModalOpen && (
                        <label className={cn(s.avatar_position)}>
                            <img
                                src={avatarUrl}
                                alt="avatar"
                                className={cn(s.avatar)}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className={cn(s.avatar_overlay)}
                                hidden
                            />
                            <span className={cn(s.avatar_overlay)}>
                                Change avatar
                            </span>
                        </label>
                    )}
                    {isModalOpen && (
                        <Container className={cn(s.modal)}>
                            <div className={cn(s.modal_overlay)}></div>
                            <div className={cn(s.modal_container)}>
                                <img
                                    src={previewAvatar}
                                    alt="avatar"
                                    className={cn(s.modal_preview)}
                                />

                                <div className={cn(s.modal_buttons)}>
                                    <button
                                        className={cn(s.modal_cancel_button)}
                                        onClick={(e) => setIsModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className={cn(s.modal_confirm_button)}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </Container>
                    )}
                </Form>

                <Container className={cn(s.profile_info)}>
                    <Typography variant="h4">User information</Typography>
                    <Typography variant="h6">Full name: {username}</Typography>
                    <Typography variant="h6">Email: {email}</Typography>
                </Container>

                <Button onClick={handleOpenChangePassword}>
                    Change password?
                </Button>

                <FormProvider {...methods}>
                    <Form onSubmit={methods.handleSubmit(onSubmitPassword)}>
                        {showChangePass && (
                            <Container className={cn(s.password_section)}>
                                <FormInputText
                                    label="Пароль"
                                    name={'oldPassword'}
                                />
                                <FormInputText
                                    label="Новый пароль"
                                    name={'newPassword'}
                                />
                                <Button
                                    type="submit"
                                    variant={'contained'}
                                    // disabled={!newPassword || !oldPassword}
                                >
                                    Change password
                                </Button>
                            </Container>
                        )}
                    </Form>
                </FormProvider>
            </Container>
        </RootLayout>
    );
}
