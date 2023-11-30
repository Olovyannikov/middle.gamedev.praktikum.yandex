import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, usersOperations } from '@/shared/constants/api';
import {
    avatarRequest,
    avatarResponse,
    passwordRequest,
    passwordResponse,
} from '@/shared/types/api';

export const usersApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        changeAvatar: builder.mutation<avatarResponse, avatarRequest>({
            query: (body) => ({
                url: usersOperations.avatar,
                method: 'PUT',
                body,
                credentials: 'include',
                invalidatesTags: ['User'],
            }),
        }),
        changePassword: builder.mutation<passwordResponse, passwordRequest>({
            query: (body) => ({
                url: usersOperations.password,
                method: 'PUT',
                body,
                responseHandler: 'text',
                credentials: 'include',
            }),
        }),
    }),
});

export const { useChangeAvatarMutation, useChangePasswordMutation } = usersApi;
