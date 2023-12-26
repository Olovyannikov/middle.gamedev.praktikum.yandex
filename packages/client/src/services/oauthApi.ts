import { baseApi } from './baseApi';
import { oauthOperations, redirectUri } from '@/shared/constants/api';

import { YandexRequest, ServiceIdResponse } from '@/shared/types/api';

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

export const { useSignInUpWithYandexMutation, useLazyGetServiceIdQuery } =
    oauthApi;
