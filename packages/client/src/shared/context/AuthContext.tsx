import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { useGetUserQuery } from '@/services/authApi';
interface AuthContextProps {
    isAuth: boolean;
    isLoading: boolean;
    logoutHandler: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    isAuth: false,
    isLoading: false,
    logoutHandler: () => undefined,
});

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuth, setIsAuth] = useState(false);

    const { data, error, isError, isLoading } = useGetUserQuery();

    const logoutHandler = () => setIsAuth(false);

    useEffect(() => {
        if (isError) {
            setIsAuth(false);
        } else if (!isLoading && data) {
            setIsAuth(true);
        }
    }, [data, error]);

    const memoizedValues = useMemo(
        () => ({
            isAuth,
            isLoading,
            logoutHandler,
        }),
        [isAuth, isLoading]
    );

    return <AuthContext.Provider value={memoizedValues}>{children}</AuthContext.Provider>;
};
