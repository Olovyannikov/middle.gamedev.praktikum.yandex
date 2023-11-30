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
import { Button, Modal, Typography } from '@mui/material';
import { useGetUserQuery, useChangePasswordMutation } from '@/services/authApi';
import { resourcesBaseUrl } from '@/shared/constants/api';
import { FormStatusLine } from '@/components/FormStatusLine';

export default function ProfilePage() {
    const methods = useForm<NewPasswordSchemaType>({
        mode: 'onChange',
        resolver: zodResolver(NewPasswordSchema),
    });

    const { data: user } = useGetUserQuery();
    const [changePassword, { isLoading: isUpdating, isError, error }] =
        useChangePasswordMutation();
    const [showChangePass, setShowChangePass] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(imgAvatar);
    const [previewAvatar, setPreviewAvatar] = useState(imgAvatar);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onSubmitPassword: SubmitHandler<NewPasswordSchemaType> = async (
        data
    ) => {
        const response = await changePassword(data);
        if (response && response.data == 'OK') {
            setShowChangePass(false);
        }
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
                    id="avatarForm"
                    className={cn(s.form_avatar)}
                    onSubmit={handleSubmitAvatar}
                >
                    <label className={cn(s.avatar_position)}>
                        <img
                            src={
                                user.avatar
                                    ? resourcesBaseUrl + user.avatar
                                    : avatarUrl
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
                                    isUpdating={isUpdating}
                                    isError={isError}
                                    error={error?.data?.reason}
                                />
                            </Container>
                        )}
                    </Form>
                </FormProvider>
            </Container>
        </RootLayout>
    );
}
