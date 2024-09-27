import { BackendUrlConstants } from './backend-url.constants';

export interface BackendOptions {
    URL: BackendUrlConstants;
    baseURL?: string;
    createLoaderProcess?: boolean;
    customErrorCallback?: (message: string, customErrorMessage?: string) => unknown;
    customErrorMessage?: string;
    executeErrorCallback?: boolean;
    headers?: Record<string, string>;
    requireAccessToken?: boolean;
    retry?: boolean;
}
