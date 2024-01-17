import { basePracticumApi } from '@/services/settings';
import { avatarRequest, avatarResponse, passwordResponse } from '@/shared/types/api';
import { NewPasswordSchemaType } from '@/shared/validators/UserValidation';

import { baseApi } from '../baseApi';

const usersOperations = {
    avatar: basePracticumApi + '/user/profile/avatar',
    password: basePracticumApi + '/user/password',
} as const;

export const UserService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        changeAvatar: builder.mutation<avatarResponse, avatarRequest>({
            query: (body) => ({
                url: usersOperations.avatar,
                method: 'PUT',
                body,
                credentials: 'include',
            }),
            invalidatesTags: ['User'],
        }),
        changePassword: builder.mutation<passwordResponse, NewPasswordSchemaType>({
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

export const { useChangeAvatarMutation, useChangePasswordMutation } = UserService;
