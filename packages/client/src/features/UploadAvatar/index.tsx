import { type ChangeEvent, type FormEvent, useState } from 'react';
import { Button, Modal } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import cn from 'clsx';
import { useToggle } from 'usehooks-ts';

import imgAvatar from '@/app/assets/img/avatar_default.svg';
import { Form } from '@/components/Form';
import { FormStatusLine } from '@/components/FormStatusLine';
import { useGetUserQuery } from '@/services/AuthService/AuthService';
import { resourcesBaseUrl } from '@/services/settings';
import { useChangeAvatarMutation } from '@/services/UserService/User.service';
import { useAuth } from '@/shared/context/AuthContext';
import type { RequestError } from '@/shared/types/api';
import { Container } from '@/shared/ui';

import s from './UploadAvatar.module.scss';

export const UploadAvatar = () => {
    const { isAuth } = useAuth();
    const [isModalOpen, setIsModalOpen] = useToggle(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [previewAvatar, setPreviewAvatar] = useState<string>(imgAvatar);

    const { data: user } = useGetUserQuery(!isAuth ? skipToken : undefined);
    const [changeAvatar, { isLoading: isAvatarUpdating, isError: isAvatarError, error: avatarError }] =
        useChangeAvatarMutation();

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarFile(file);
        setIsModalOpen();
        setPreviewAvatar(URL.createObjectURL(file));
    };

    const handleSubmitAvatar = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!avatarFile) return;
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        const response = await changeAvatar(formData);
        if ('data' in response) {
            setIsModalOpen();
        }
    };

    return (
        <Form id='avatarForm' className={s.root} onSubmit={handleSubmitAvatar}>
            <label
                className={cn(s.position, {
                    [s.baseAvatar]: !user || !user.avatar,
                })}
            >
                <img
                    src={user && user.avatar ? resourcesBaseUrl + user.avatar : imgAvatar}
                    alt='avatar'
                    className={s.avatar}
                />
                <input type='file' accept='image/*' onChange={handleAvatarChange} className={s.overlay} hidden />
                <span className={s.overlay}>Change avatar</span>
            </label>
            <Modal open={isModalOpen} onClose={setIsModalOpen} className={s.modal}>
                <Container className={s.modalContainer}>
                    <img src={previewAvatar} alt='avatar' className={s.modalPreview} />

                    <Container className={s.modalButtons}>
                        <Button variant='contained' color='secondary' onClick={setIsModalOpen}>
                            Cancel
                        </Button>
                        <Button variant='contained' type='submit' form='avatarForm'>
                            Save
                        </Button>
                        <FormStatusLine
                            isUpdating={isAvatarUpdating}
                            isError={isAvatarError}
                            error={
                                avatarError && 'status' in avatarError ? (avatarError.data as RequestError).reason : ''
                            }
                        />
                    </Container>
                </Container>
            </Modal>
        </Form>
    );
};
