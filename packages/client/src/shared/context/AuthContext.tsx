import {
    createContext,
    useContext,
    useState,
    useEffect,
    PropsWithChildren,
} from 'react';

import { useGetUserQuery } from '@/services/authApi';
import { isErrorWithStatus } from '@/shared/types/guards/isError';
interface AuthContextProps {
    isAuth: boolean;
    isLoading: boolean;
    logoutHandler: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    isAuth: false,
    isLoading: false,
    logoutHandler: () => void true,
});

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }: PropsWithChildren) {
    const [isAuth, setIsAuth] = useState(false);

    const { data, error, isError, isLoading } = useGetUserQuery();

    const logoutHandler = () => setIsAuth(false);

    useEffect(() => {
        if (!isLoading && data) {
            setIsAuth(true);
        }

        if (isError && isErrorWithStatus(error) && error?.status === 401) {
            setIsAuth(false);
        }
    }, [data]);

    return (
        <AuthContext.Provider value={{ isAuth, isLoading, logoutHandler }}>
            {children}
        </AuthContext.Provider>
    );
}
