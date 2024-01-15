import { UserInfo } from '@/entities/UserInfo';
import { ChangePassword, UploadAvatar } from '@/features';
import { RootLayout } from '@/layouts/RootLayout';
import { Container } from '@/shared/ui';

import s from './ProfilePage.module.scss';

export default function ProfilePage() {
    return (
        <RootLayout>
            <Container className={s.container}>
                <UploadAvatar />
                <UserInfo />
                <ChangePassword />
            </Container>
        </RootLayout>
    );
}
