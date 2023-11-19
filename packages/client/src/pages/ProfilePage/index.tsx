import cn from 'clsx';
import { RootLayout } from '@/layouts/RootLayout';
import { ChangeEvent, useRef, useState } from 'react';
import s from './profile.module.scss';
import { Button } from '@/shared/ui/Button';
import imgAvatar from '@/app/assets/img/avatar_default.svg';
import backgroundMain from '@/app/assets/img/bg.svg';
import { Container } from '@/shared/ui';

export default function ProfilePage() {
    const [username, setUsername] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [oldPassword, setOldPassword] = useState('');
    const [showChangePass, setShowChangePass] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [avatarUrl, setAvatarUrl] = useState(imgAvatar);
    const [previewAvatar, setPreviewAvatar] = useState(imgAvatar);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ref to control input element
    const inputRef = useRef(null);

    const handleNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleOldPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setOldPassword(e.target.value);
    };

    const handleSubmitPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Здесь можно добавить логику валидации перед отправкой данных
        // Например, проверка на минимальную длину пароля и другие условия

        // Отправка запроса на смену пароля

        setOldPassword('');
        setNewPassword('');
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

                <form
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
                        <div className={cn(s.modal)}>
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
                        </div>
                    )}
                </form>

                <div className={cn(s.profile_info)}>
                    <h2>User information</h2>
                    <p>Full name: {username}</p>
                    <p>Email: {email}</p>
                </div>

                <Button text onClick={handleOpenChangePassword}>
                    Change password?
                </Button>

                <form onSubmit={handleSubmitPassword}>
                    {showChangePass && (
                        <div className={cn(s.password_section)}>
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={oldPassword}
                                onChange={handleOldPassword}
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={handleNewPassword}
                            />
                            <Button
                                type="submit"
                                disabled={!newPassword || !oldPassword}
                            >
                                Change password
                            </Button>
                        </div>
                    )}
                </form>
            </Container>
        </RootLayout>
    );
}
