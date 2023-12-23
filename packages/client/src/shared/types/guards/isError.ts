import { isObject } from 'lodash-es';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function isErrorWithStatus(
    value: unknown
): value is FetchBaseQueryError {
    return isObject(value) && 'status' in value;
}
