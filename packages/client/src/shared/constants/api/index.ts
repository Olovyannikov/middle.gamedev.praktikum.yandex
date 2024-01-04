export const baseUrl = 'https://ya-praktikum.tech/api/v2';

export const resourcesBaseUrl = baseUrl + '/resources';

export const authOperations = {
    signup: '/auth/signup',
    signin: '/auth/signin',
    user: '/auth/user',
    logout: '/auth/logout',
};

export const usersOperations = {
    avatar: '/user/profile/avatar',
    password: '/user/password',
};

export const redirectUri = 'http://localhost:3000';

export const oauthOperations = {
    yandex: '/oauth/yandex',
    serviceId: '/oauth/yandex/service-id',
};
