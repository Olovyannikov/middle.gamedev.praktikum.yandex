import { baseApi } from './baseApi';
import { usersOperations } from '@/shared/constants/api';
import {
    avatarRequest,
    avatarResponse,
    passwordRequest,
    passwordResponse,
} from '@/shared/types/api';

const usersApi = baseApi.injectEndpoints({
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
                credentials: 'include',
                responseHandler: (response) => {
                    if (response.status == 200) return response.text();
                    return response.json();
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useChangeAvatarMutation, useChangePasswordMutation } = usersApi;
