import {
    createContext,
    useContext,
    useState,
    useEffect,
    PropsWithChildren,
} from 'react';

import { useGetUserQuery } from '@/services/authApi';

const AuthContext = createContext(false);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
    const [isAuth, setIsAuth] = useState(false);

    const { data } = useGetUserQuery();

    useEffect(() => {
        //console.log('useEffect from AuthProvider', data);
        if (data) {
            setIsAuth(true);
        }
    }, [data]);

    return (
        <AuthContext.Provider value={isAuth}>{children}</AuthContext.Provider>
    );
}
