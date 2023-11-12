import type { PropsWithChildren } from 'react';
import { Header } from './Header';
import { Main } from './Main';

export const RootLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Header />
            <Main>{children}</Main>
        </>
    );
};
