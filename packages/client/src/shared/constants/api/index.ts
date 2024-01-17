export const baseUrl = 'localhost:3001';

const practicumProxy = '/practicum';

const basePracticumApi = baseUrl + practicumProxy;

export const resourcesBaseUrl = 'http://' + basePracticumApi + '/resources';

const baseLocalApi = baseUrl + '/api';

export const serverOperations = {
    themeChange: baseLocalApi + '/theme',
};

export const authOperations = {
    signup: basePracticumApi + '/auth/signup',
    signin: basePracticumApi + '/auth/signin',
    user: baseLocalApi + '/user',
    logout: basePracticumApi + '/auth/logout',
};

export const usersOperations = {
    avatar: basePracticumApi + '/user/profile/avatar',
    password: basePracticumApi + '/user/password',
};

export const redirectUri = 'http://localhost:3000'; // нужно брать url, в зав. от режима (dev/ssr)

export const oauthOperations = {
    yandex: basePracticumApi + '/oauth/yandex',
    serviceId: basePracticumApi + '/oauth/yandex/service-id',
};
