import cn from 'clsx';

import { UserInfo } from '@/entities/UserInfo';
import { ChangePassword, UploadAvatar } from '@/features';
import { RootLayout } from '@/layouts/RootLayout';
import { useIsDarkMode } from '@/shared/hooks/useIsDarkMode';
import { Container } from '@/shared/ui';

import s from './ProfilePage.module.scss';

export default function ProfilePage() {
    const isDarkMode = useIsDarkMode();

    return (
        <RootLayout>
            <Container className={cn(s.container, isDarkMode && s.darkButton)}>
                <UploadAvatar />
                <UserInfo />
                <ChangePassword />
            </Container>
        </RootLayout>
    );
}
