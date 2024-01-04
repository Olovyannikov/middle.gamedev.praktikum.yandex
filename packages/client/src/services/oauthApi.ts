import { oauthOperations, redirectUri } from '@/shared/constants/api';
import type { ServiceIdResponse, YandexRequest } from '@/shared/types/api';

import { baseApi } from './baseApi';

export const oauthApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signInUpWithYandex: builder.mutation<void, YandexRequest>({
            query: (body) => ({
                body,
                url: oauthOperations.yandex,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['User'],
        }),
        getServiceId: builder.query<ServiceIdResponse, void>({
            query: () => ({
                url: oauthOperations.serviceId,
                params: { redirect_uri: redirectUri },
                credentials: 'include',
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useSignInUpWithYandexMutation, useLazyGetServiceIdQuery } = oauthApi;
