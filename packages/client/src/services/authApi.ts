import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl, authOperations } from '@/shared/constants/api';
import {
    signinRequest,
    signinResponse,
    userResponse,
} from '@/shared/types/api';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        signIn: builder.mutation<signinResponse, signinRequest>({
            query: (body) => ({
                url: authOperations.signin,
                method: 'POST',
                body,
                responseHandler: 'text',
                credentials: 'include',
            }),
        }),
        getUser: builder.query<userResponse, void>({
            query: () => ({
                url: authOperations.user,
                credentials: 'include',
            }),
        }),
    }),
});

export const { useSignInMutation, useGetUserQuery } = authApi;
