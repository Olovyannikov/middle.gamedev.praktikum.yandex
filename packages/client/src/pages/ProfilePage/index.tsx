import cn from 'clsx';
import { RootLayout } from '@/layouts/RootLayout';
import { ChangeEvent, FormEvent, useState } from 'react';
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
import { Button, Modal, Typography } from '@mui/material';
import { useGetUserQuery } from '@/services/authApi';
import {
    useChangePasswordMutation,
    useChangeAvatarMutation,
} from '@/services/usersApi';
import { resourcesBaseUrl } from '@/shared/constants/api';
import { FormStatusLine } from '@/components/FormStatusLine';
import { RequestError } from '@/shared/types/api';
import { useAuth } from '@/shared/context/AuthContext';

export default function ProfilePage() {
    const { isAuth } = useAuth();
    const methods = useForm<NewPasswordSchemaType>({
        mode: 'onChange',
        resolver: zodResolver(NewPasswordSchema),
    });

    const { data: user } = useGetUserQuery(void true, {
        skip: !isAuth,
    });
    const [
        changePassword,
        {
            isLoading: isPasswordUpdating,
            isError: isPasswordError,
            error: passwordError,
        },
    ] = useChangePasswordMutation();
    const [
        changeAvatar,
        {
            isLoading: isAvatarUpdating,
            isError: isAvatarError,
            error: avatarError,
        },
    ] = useChangeAvatarMutation();
    const [showChangePass, setShowChangePass] = useState<boolean>(false);
    const [previewAvatar, setPreviewAvatar] = useState<string>(imgAvatar);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const onSubmitPassword: SubmitHandler<NewPasswordSchemaType> = async (
        data
    ) => {
        const response = await changePassword(data);
        if ('error' in response) {
            console.log(response);
        } else {
            setShowChangePass(false);
        }
    };

    const handleOpenChangePassword = () => {
        setShowChangePass(!showChangePass);
    };

    const handleSubmitAvatar = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!avatarFile) return;
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        const response = await changeAvatar(formData);
        if ('data' in response) {
            setIsModalOpen(false);
        }
    };

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarFile(file);
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
                />

                <Form
                    id="avatarForm"
                    className={cn(s.form_avatar)}
                    onSubmit={handleSubmitAvatar}
                >
                    <label className={cn(s.avatar_position)}>
                        <img
                            src={
                                user && user.avatar
                                    ? resourcesBaseUrl + user.avatar
                                    : imgAvatar
                            }
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

                    <Modal
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        className={cn(s.modal)}
                    >
                        <Container className={cn(s.modal_container)}>
                            <img
                                src={previewAvatar}
                                alt="avatar"
                                className={cn(s.modal_preview)}
                            />

                            <Container className={cn(s.modal_buttons)}>
                                <Button
                                    variant={'contained'}
                                    color="secondary"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant={'contained'}
                                    type="submit"
                                    form="avatarForm"
                                >
                                    Save
                                </Button>
                                <FormStatusLine
                                    isUpdating={isAvatarUpdating}
                                    isError={isAvatarError}
                                    error={
                                        avatarError && 'status' in avatarError
                                            ? (avatarError.data as RequestError)
                                                  .reason
                                            : ''
                                    }
                                />
                            </Container>
                        </Container>
                    </Modal>
                </Form>

                <Container className={cn(s.profile_info)}>
                    <Typography variant="h4">User information</Typography>
                    {user ? (
                        <div>
                            <Typography variant="h6">
                                Login: {user.login}
                            </Typography>
                            <Typography variant="h6">
                                Full name: {user.first_name + user.second_name}
                            </Typography>
                            <Typography variant="h6">
                                Display name: {user.display_name}
                            </Typography>
                            <Typography variant="h6">
                                Email: {user.email}
                            </Typography>
                            <Typography variant="h6">
                                Phone: {user.phone}
                            </Typography>
                        </div>
                    ) : null}
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
                                    type={'password'}
                                />
                                <FormInputText
                                    label="Новый пароль"
                                    name={'newPassword'}
                                    type={'password'}
                                />
                                <Button type="submit" variant={'contained'}>
                                    Change password
                                </Button>
                                <FormStatusLine
                                    isUpdating={isPasswordUpdating}
                                    isError={isPasswordError}
                                    error={
                                        passwordError &&
                                        'status' in passwordError
                                            ? (
                                                  passwordError.data as RequestError
                                              ).reason
                                            : ''
                                    }
                                />
                            </Container>
                        )}
                    </Form>
                </FormProvider>
            </Container>
        </RootLayout>
    );
}
