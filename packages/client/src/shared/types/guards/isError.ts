import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { isObject } from 'lodash-es';

export function isErrorWithStatus(value: unknown): value is FetchBaseQueryError {
    return isObject(value) && 'error' in value;
}
