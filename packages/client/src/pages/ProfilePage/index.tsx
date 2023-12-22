import { type ChangeEvent, type FormEvent, useState } from 'react';
import { Button, Modal, Typography } from '@mui/material';
import cn from 'clsx';

import imgAvatar from '@/app/assets/img/avatar_default.svg';
import backgroundMain from '@/app/assets/img/bg.svg';
import { Form } from '@/components/Form';
import { FormStatusLine } from '@/components/FormStatusLine';
import { ChangePassword } from '@/features';
import { RootLayout } from '@/layouts/RootLayout';
import { useGetUserQuery } from '@/services/authApi';
import { useChangeAvatarMutation } from '@/services/usersApi';
import { resourcesBaseUrl } from '@/shared/constants/api';
import { useAuth } from '@/shared/context/AuthContext';
import type { RequestError } from '@/shared/types/api';
import { Container } from '@/shared/ui';

import s from './profile.module.scss';

export default function ProfilePage() {
    const { isAuth } = useAuth();

    const { data: user } = useGetUserQuery(undefined, {
        skip: !isAuth,
    });

    const [changeAvatar, { isLoading: isAvatarUpdating, isError: isAvatarError, error: avatarError }] =
        useChangeAvatarMutation();
    const [previewAvatar, setPreviewAvatar] = useState<string>(imgAvatar);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

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
                <img src={backgroundMain} alt='background' className={cn(s.main_background)} />

                <Form id='avatarForm' className={cn(s.form_avatar)} onSubmit={handleSubmitAvatar}>
                    <label className={cn(s.avatar_position)}>
                        <img
                            src={user && user.avatar ? resourcesBaseUrl + user.avatar : imgAvatar}
                            alt='avatar'
                            className={cn(s.avatar)}
                        />
                        <input
                            type='file'
                            accept='image/*'
                            onChange={handleAvatarChange}
                            className={cn(s.avatar_overlay)}
                            hidden
                        />
                        <span className={cn(s.avatar_overlay)}>Change avatar</span>
                    </label>

                    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} className={cn(s.modal)}>
                        <Container className={cn(s.modal_container)}>
                            <img src={previewAvatar} alt='avatar' className={cn(s.modal_preview)} />

                            <Container className={cn(s.modal_buttons)}>
                                <Button variant='contained' color='secondary' onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant='contained' type='submit' form='avatarForm'>
                                    Save
                                </Button>
                                <FormStatusLine
                                    isUpdating={isAvatarUpdating}
                                    isError={isAvatarError}
                                    error={
                                        avatarError && 'status' in avatarError
                                            ? (avatarError.data as RequestError).reason
                                            : ''
                                    }
                                />
                            </Container>
                        </Container>
                    </Modal>
                </Form>

                <Container className={cn(s.profile_info)}>
                    <Typography variant='h4'>User information</Typography>
                    {user ? (
                        <div>
                            <Typography variant='h6'>Login: {user.login}</Typography>
                            <Typography variant='h6'>Full name: {user.first_name + user.second_name}</Typography>
                            <Typography variant='h6'>Display name: {user.display_name}</Typography>
                            <Typography variant='h6'>Email: {user.email}</Typography>
                            <Typography variant='h6'>Phone: {user.phone}</Typography>
                        </div>
                    ) : null}
                </Container>

                <ChangePassword />
            </Container>
        </RootLayout>
    );
}
