import { Typography } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import cn from 'clsx';

import { useGetUserQuery } from '@/services/AuthService/AuthService';
import { useAuth } from '@/shared/context/AuthContext';
import { Container } from '@/shared/ui';

import s from './UserInfo.module.scss';

export const UserInfo = () => {
    const { isAuth } = useAuth();
    const { data: user } = useGetUserQuery(!isAuth ? skipToken : undefined);

    return (
        <Container className={cn(s.info)}>
            <Typography variant='h4'>User information</Typography>
            {user ? (
                <div>
                    <Typography variant='h6'>Login: {user.login}</Typography>
                    <Typography variant='h6'>Full name: {user.first_name + ' ' + user.second_name}</Typography>
                    <Typography variant='h6'>Display name: {user.display_name}</Typography>
                    <Typography variant='h6'>Email: {user.email}</Typography>
                    <Typography hidden={!user.phone} variant='h6'>
                        Phone: {user.phone}
                    </Typography>
                </div>
            ) : null}
        </Container>
    );
};
