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

export type signinResponse = null | requestError;

export type signupRequest = {
    first_name: string;
    second_name: string;
    phone: string;
    login: string;
    email: string;
    password: string;
};

export type signupResponse =
    | {
          id: number;
      }
    | requestError;

export type userResponse = User | requestError;
