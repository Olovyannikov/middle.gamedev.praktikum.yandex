import { baseApi } from '../baseApi';
import { baseLocalApi } from '../settings';
import { ThemeResponse } from './theme.dto';

const THEME_ENDPOINTS = {
    THEME: baseLocalApi + '/theme',
} as const;

export const themeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        changeTheme: builder.mutation<ThemeResponse, string>({
            query: (body) => ({
                url: THEME_ENDPOINTS.THEME,
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
