export const RegExps = {
    oneCapitalLetter: /[A-Z\u0400-\u04FF]/,
    oneNumber: /\d/,
    capitalLetterHyphen: /^[A-ZЁА-Я][a-zа-яё]*(-[A-ZЁА-Яa-zа-яё]*)?$/,
    latinHyphenUnderscore: /^[\d_A-Za-z-]+$/,
    notOnlyNumbers: /\D/,
    numbersPlus: /^\+?\d+$/,
    email: /^[\w-]+@[\w-]+\.[A-Za-z]{2,}/,
};
