import type { PropsWithChildren } from 'react';
import cn from 'clsx';

import { useIsDarkMode } from '@/shared/hooks/useIsDarkMode';

import { Header } from './Header';
import { Main } from './Main';

interface RootLayoutProps {
    hasHeader?: boolean;
}

export function RootLayout({ hasHeader = true, children }: PropsWithChildren<RootLayoutProps>) {
    const isDarkMode = useIsDarkMode();

    return (
        <div className={cn('page-wrapper', isDarkMode ? 'dark-mode' : 'light-mode')}>
            {hasHeader && <Header />}
            <Main>{children}</Main>
        </div>
    );
}
