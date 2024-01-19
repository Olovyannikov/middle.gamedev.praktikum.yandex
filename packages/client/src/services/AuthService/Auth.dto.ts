import type { UserModel } from '@/shared/types/models/User';
import type { LoginSchemaType, RegistrationSchemaType } from '@/shared/validators/UserValidation';

export type SigninResponse = string;
export type SigninRequest = LoginSchemaType;

export interface SignupResponse {
    id: number;
}
export type SignupRequest = RegistrationSchemaType;

export type UserResponse = UserModel;
