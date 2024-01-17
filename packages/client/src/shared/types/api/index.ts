export interface RequestError {
    reason: string;
}

export interface User {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar?: string;
    email: string;
    isSSO: boolean;
}

export interface SigninRequest {
    login: string;
    password: string;
}

export type SigninResponse = string;

export type SignupRequest = {
    first_name: string;
    second_name: string;
    phone: string;
    login: string;
    email: string;
    password: string;
};

export interface SignupResponse {
    id: number;
}

export interface ThemeResponse {
    theme: string;
}

export type userResponse = User;

export type avatarRequest = FormData;

export type avatarResponse = userResponse;

export interface PasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export type passwordResponse = string;

export interface YandexRequest {
    code: string;
    redirect_uri: string;
}

export interface ServiceIdResponse {
    service_id: string;
}
