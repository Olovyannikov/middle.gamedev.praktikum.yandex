import { AUTH_ENDPOINTS } from '@/shared/constants/api';

import { baseApi } from '../baseApi';
import type { SigninRequest, SigninResponse, SignupRequest, SignupResponse, UserResponse } from './Auth.dto';

export const AuthService = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<SigninResponse, SigninRequest>({
            query: (body) => ({
                url: AUTH_ENDPOINTS.signin,
                method: 'POST',
                body,
                credentials: 'include',
                responseHandler: (response) => {
                    if (response.status == 200) return response.text();
                    return response.json();
                },
            }),
            invalidatesTags: ['User'],
        }),
        signUp: builder.mutation<SignupResponse, SignupRequest>({
            query: (body) => ({
                url: AUTH_ENDPOINTS.signup,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        getUser: builder.query<UserResponse, void>({
            query: () => ({
                url: AUTH_ENDPOINTS.user,
                credentials: 'include',
            }),
            transformErrorResponse: () => ({
                data: null,
            }),
            providesTags: ['User'],
        }),
        logOut: builder.mutation<void, void>({
            query: () => ({
                url: AUTH_ENDPOINTS.logout,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['User'],
        }),
    }),
    overrideExisting: false,
});

export const { useSignInMutation, useGetUserQuery, useSignUpMutation, useLogOutMutation } = AuthService;
