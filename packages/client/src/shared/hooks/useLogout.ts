import { useNavigate } from 'react-router-dom';
import { useLogOutMutation } from '@/services/authApi';
import { useAuth } from '@/shared/context/AuthContext';

export const useLogout = () => {
    const { logoutHandler } = useAuth();
    const navigate = useNavigate();
    const [logoutTrigger, { isLoading }] = useLogOutMutation();

    const logout = async () => {
        await logoutTrigger();
        logoutHandler();
        navigate('/');
    };

    return {
        logout,
        isLoading,
    };
};
