export type requestError = {
    reason: string;
};

export type User = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar?: string;
    email: string;
};

export type signinRequest = {
    login: string;
    password: string;
};

export type signinResponse = null;

export type signupRequest = {
    first_name: string;
    second_name: string;
    phone: string;
    login: string;
    email: string;
    password: string;
};

export type signupResponse = { id: number };

export type userResponse = User;

export type avatarRequest = {
    avatar: FormData;
};

export type avatarResponse = userResponse;

export type passwordRequest = {
    oldPassword: string;
    newPassword: string;
};

export type passwordResponse = null;
