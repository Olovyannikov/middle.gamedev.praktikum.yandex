import type { PropsWithChildren } from 'react';
import { Header } from './Header';
import { Main } from './Main';

type RootLayoutProps = {
    hasHeader?: boolean;
};

export const RootLayout = ({
    hasHeader = true,
    children,
}: PropsWithChildren<RootLayoutProps>) => {
    return (
        <>
            {hasHeader ? <Header /> : null}
            <Main>{children}</Main>
        </>
    );
};
