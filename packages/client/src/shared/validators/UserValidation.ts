import { z } from 'zod';
import { RegExps } from '@/shared/constants/validators';

const loginFields = ['login', 'password'];

const registrationFields = [
    'login',
    'password',
    'confirmPassword',
    'first_name',
    'second_name',
    'phone',
    'email',
];

const passwordRules = z
    .string()
    .min(8, { message: 'Не менее 8 символов' })
    .max(40, { message: 'Не более 40 символов' })
    .regex(RegExps.oneCapitalLetter, {
        message: 'Должен содержать хотя бы одну заглавную букву и цифру',
    })
    .regex(RegExps.oneNumber, {
        message: 'Должен содержать хотя бы одну заглавную букву и цифру',
    });

const nameRules = z.string().regex(RegExps.capitalLetterHyphen, {
    message:
        'Начинать нужно с заглавной буквы, из спецсимволов допустим только дефис',
});

const loginRules = z
    .string()
    .min(3, { message: 'Не менее 3 символов' })
    .max(20, { message: 'Не более 20 символов' })
    .regex(RegExps.latinHyphenUnderscore, {
        message:
            'Может содержать только латинские символы, цифры, дефис и нижнее подчеркивание',
    })
    .regex(RegExps.notOnlyNumbers, {
        message: 'Не может состоять только из цифр',
    });

const phoneRules = z
    .string()
    .min(10, { message: 'Не менее 10 символов' })
    .max(15, { message: 'Не более 15 символов' })
    .regex(RegExps.numbersPlus, {
        message: 'Должен состоять только из цифр и может начинаться с плюса',
    });

const emailRules = z.string().regex(RegExps.email, {
    message: 'Заполнено неверно',
});

const validators: Record<string, z.ZodString> = {
    login: loginRules,
    password: passwordRules,
    confirmPassword: passwordRules,
    first_name: nameRules,
    second_name: nameRules,
    phone: phoneRules,
    email: emailRules,
};

function getValidatorsByFields(fieldsList: string[]) {
    const validatorsObject: Record<string, z.ZodString> = {};
    fieldsList.forEach((item) => {
        validatorsObject[item] = validators[item];
    });

    return validatorsObject;
}

export const LoginSchema = z.object(getValidatorsByFields(loginFields));

export const RegistrationSchema = z
    .object(getValidatorsByFields(registrationFields))
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export type RegistrationSchemaType = z.infer<typeof RegistrationSchema>;
