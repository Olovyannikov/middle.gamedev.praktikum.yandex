import { authOperations } from '@/shared/constants/api';
import { SigninResponse, SignupResponse, userResponse } from '@/shared/types/api';
import { LoginSchemaType, RegistrationSchemaType } from '@/shared/validators/UserValidation';

import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<SigninResponse, LoginSchemaType>({
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
            invalidatesTags: ['User'],
        }),
        signUp: builder.mutation<SignupResponse, RegistrationSchemaType>({
            query: (body) => ({
                url: authOperations.signup,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        getUser: builder.query<userResponse, void>({
            query: () => ({
                url: authOperations.user,
                credentials: 'include',
            }),
            transformErrorResponse: () => ({
                data: null,
            }),
            providesTags: ['User'],
        }),
        logOut: builder.mutation<void, void>({
            query: () => ({
                url: authOperations.logout,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['User'],
        }),
    }),
    overrideExisting: false,
});

export const { useSignInMutation, useGetUserQuery, useSignUpMutation, useLogOutMutation } = authApi;
