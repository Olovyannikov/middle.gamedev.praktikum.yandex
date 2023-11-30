import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    baseUrl,
    authOperations,
    usersOperations,
} from '@/shared/constants/api';
import {
    avatarRequest,
    avatarResponse,
    passwordRequest,
    passwordResponse,
    signinRequest,
    signinResponse,
    signupRequest,
    signupResponse,
    userResponse,
} from '@/shared/types/api';

export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        signIn: builder.mutation<signinResponse, signinRequest>({
            query: (body) => ({
                url: authOperations.signin,
                method: 'POST',
                body,
                credentials: 'include',
                responseHandler: (response) => {
                    if (response.status == 200) return response.text();
                    return response.json();
                },
            }),
        }),
        signUp: builder.mutation<signupResponse, signupRequest>({
            query: (body) => ({
                url: authOperations.signup,
                method: 'POST',
                body,
            }),
        }),
        getUser: builder.query<userResponse, void>({
            query: () => ({
                url: authOperations.user,
                credentials: 'include',
                providesTags: ['User'],
            }),
        }),
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
});

export const {
    useSignInMutation,
    useGetUserQuery,
    useSignUpMutation,
    useChangeAvatarMutation,
    useChangePasswordMutation,
} = authApi;
