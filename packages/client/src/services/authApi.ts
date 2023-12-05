import { baseApi } from './baseApi';
import { authOperations } from '@/shared/constants/api';
import {
    signinRequest,
    signinResponse,
    signupRequest,
    signupResponse,
    userResponse,
} from '@/shared/types/api';

export const authApi = baseApi.injectEndpoints({
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
            }),
            providesTags: ['User'],
        }),
    }),
    overrideExisting: false,
});

export const { useSignInMutation, useGetUserQuery, useSignUpMutation } =
    authApi;
