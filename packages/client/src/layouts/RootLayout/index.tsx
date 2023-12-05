import type { PropsWithChildren } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { AuthProvider } from '@/shared/context/AuthContext';

interface RootLayoutProps {
    hasHeader?: boolean;
}

export const RootLayout = ({
    hasHeader = true,
    children,
}: PropsWithChildren<RootLayoutProps>) => {
    return (
        <AuthProvider>
            {hasHeader && <Header />}
            <Main>{children}</Main>
        </AuthProvider>
    );
};
