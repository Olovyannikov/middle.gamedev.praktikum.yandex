import { baseApi } from '@/services/baseApi';
import { basePracticumApi } from '@/services/settings';
import { redirectUri } from '@/shared/constants/api';
import type { ServiceIdResponse, YandexRequest } from '@/shared/types/api';

const oauthOperations = {
    yandex: basePracticumApi + '/oauth/yandex',
    serviceId: basePracticumApi + '/oauth/yandex/service-id',
};

export const OAuthService = baseApi.injectEndpoints({
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

export const { useSignInUpWithYandexMutation, useLazyGetServiceIdQuery } = OAuthService;
