import { serverOperations } from '@/shared/constants/api';
import { ThemeResponse } from '@/shared/types/api';
import { baseApi } from './baseApi';

export const themeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        changeTheme: builder.mutation<ThemeResponse, string>({
            query: (body) => ({
                url: serverOperations.themeChange,
                method: 'POST',
                body: {
                    theme: body,
                },
                credentials: 'include',
            }),
            invalidatesTags: ['User'],
        }),
    }),
    overrideExisting: false,
});

export const { useChangeThemeMutation } = themeApi;
