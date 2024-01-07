import type { UserModel } from '@/shared/types/models/User';

export interface RequestError {
    reason: string;
}

export type avatarRequest = FormData;

export type avatarResponse = UserModel;

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
