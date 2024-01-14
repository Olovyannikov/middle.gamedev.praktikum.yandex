export const baseUrl = 'localhost:3001';

const practicumProxy = '/practicum';

const basePracticumApi = baseUrl + practicumProxy;

export const resourcesBaseUrl = 'http://' + basePracticumApi + '/resources';

const baseLocalApi = baseUrl + '/api';

export const AUTH_ENDPOINTS = {
    signup: basePracticumApi + '/auth/signup',
    signin: basePracticumApi + '/auth/signin',
    user: baseLocalApi + '/user',
    logout: basePracticumApi + '/auth/logout',
} as const;

export const usersOperations = {
    avatar: basePracticumApi + '/user/profile/avatar',
    password: basePracticumApi + '/user/password',
};

export const redirectUri = window?.location.origin ?? 'localhost:3000';

export const oauthOperations = {
    yandex: basePracticumApi + '/oauth/yandex',
    serviceId: basePracticumApi + '/oauth/yandex/service-id',
};
