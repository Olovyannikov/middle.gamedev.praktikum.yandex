import { baseApi } from './baseApi';
import { authOperations } from '@/shared/constants/api';
import {
    signinResponse,
    signupResponse,
    userResponse,
} from '@/shared/types/api';
import {
    LoginSchemaType,
    RegistrationSchemaType,
} from '@/shared/validators/UserValidation';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<signinResponse, LoginSchemaType>({
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
        signUp: builder.mutation<signupResponse, RegistrationSchemaType>({
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
            providesTags: ['User'],
        }),
    }),
    overrideExisting: false,
});

export const { useSignInMutation, useGetUserQuery, useSignUpMutation } =
    authApi;
