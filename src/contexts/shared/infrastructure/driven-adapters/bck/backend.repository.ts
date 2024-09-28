import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BackendOptions } from './backend.options';
import { LoadingSourceUseCase } from '../../../domain/usecase/LoadingSource.UseCase';
import { SessionManageUseCase } from '../../../../auth/domain/usecase/SessionManage.UseCase';
import { SessionData } from '../../../../auth/domain/model/SessionData';
import { BackendUrlConstants } from './backend-url.constants';
import { AppRoutesConstants } from '../../../domain/model/constants/AppRoutes.Constants';
import { SessionManageInstance } from '../../../../auth/applications/dependencyInjection/SessionManageInstance';
import { toast } from 'react-toastify';
import { firstValueFrom } from 'rxjs';

export class BackendRepository {
    private static async refreshTokens(): Promise<SessionData | undefined> {
        const session = await firstValueFrom(SessionManageUseCase.subjectOfSessionData);
        if (session) {
            const response = await this.post<SessionData, NonNullable<unknown>>(
                {},
                {
                    URL: BackendUrlConstants.REFRESH_TOKENS,
                    headers: {
                        'refresh-token': session.refreshToken,
                    },
                    requireAccessToken: false,
                    retry: false,
                },
            );
            if (response) {
                await SessionManageInstance.saveSessionData(response);
            } else {
                await SessionManageInstance.closeSession();
            }
            return response;
        } else {
            await SessionManageInstance.closeSession();
            return undefined;
        }
    }

    private static async buildRequestConfig(options?: BackendOptions): Promise<AxiosRequestConfig> {
        const baseURL = options?.baseURL ?? process.env.REACT_APP_BACKEND_BASE_URL;
        const requireAccessToken = options?.requireAccessToken ?? true;
        const config: AxiosRequestConfig = {
            baseURL,
        };
        if (requireAccessToken) {
            const accessToken: string | undefined = (await firstValueFrom(SessionManageUseCase.subjectOfSessionData))
                ?.token;
            if (!accessToken) {
                console.log(accessToken);
                console.log(options);
                throw new Error('Access_Token_Not_Found');
            } else {
                config.headers = { authorization: `Bearer ${accessToken}` };
            }
        }
        return config;
    }

    private static resolveIfCanRetry(status: number, options?: BackendOptions): boolean {
        return (options?.retry ?? true) && this.resolveIfIsUnauthorized(status);
    }

    private static resolveIfIsUnauthorized(status?: number, message?: string): boolean {
        return status === 401 || message === 'Access_Token_Not_Found';
    }

    private static processError(e: unknown, options?: BackendOptions): { message: string; status: number } {
        const executeErrorCallback = options?.executeErrorCallback ?? true;
        let status: number = 500;
        let message: string = 'Internal_Server_Error';
        if (
            e instanceof AxiosError &&
            e.response?.data &&
            typeof e.response.data === 'object' &&
            e.response.data.message
        ) {
            message = e.response.data.message;
            status = e.status ?? status;
        } else if (e instanceof Error) {
            message = e.message;
        }

        if (
            !BackendRepository.resolveIfCanRetry(status, options) &&
            !BackendRepository.resolveIfIsUnauthorized(status, message) &&
            executeErrorCallback
        ) {
            if (options?.customErrorCallback) {
                options.customErrorCallback(message, options?.customErrorMessage);
            } else {
                console.log(options?.customErrorMessage ?? message);
                toast.error(options?.customErrorMessage ?? message);
            }
        }
        return { message, status };
    }

    public static async get<Res, Req extends Record<string, unknown> = never>(
        options: BackendOptions,
        query?: Req,
    ): Promise<Res | undefined> {
        const process = options.createLoaderProcess ?? true ? LoadingSourceUseCase.addLoaderProcess() : undefined;
        try {
            const config: AxiosRequestConfig = await BackendRepository.buildRequestConfig(options);
            if (query) config.params = query;
            return await axios.get<Res>(String(options.URL), config).then((res: AxiosResponse<Res>) => res.data);
        } catch (e: unknown) {
            const { status, message } = this.processError(e, options);
            if (BackendRepository.resolveIfCanRetry(status, options)) {
                const sessionData = await this.refreshTokens();
                if (sessionData) {
                    await this.get({ ...options, retry: false }, query);
                } else {
                    toast.error('Inicia sesión para hacer esta accion');
                }
            } else if (BackendRepository.resolveIfIsUnauthorized(status, message)) {
                toast.error('Inicia sesión Para hacer esta accion');
                SessionManageInstance.closeSession().then(() => {
                    window.history.pushState({}, '', AppRoutesConstants.LOGIN_PAGE);
                });
            }
            return undefined;
        } finally {
            if (process) LoadingSourceUseCase.removeLoaderProcess(process);
        }
    }

    public static async post<Res, Req extends Record<string, unknown>>(
        body: Req,
        options: BackendOptions,
    ): Promise<Res | undefined> {
        const process = options.createLoaderProcess ?? true ? LoadingSourceUseCase.addLoaderProcess() : undefined;
        try {
            const config: AxiosRequestConfig = await BackendRepository.buildRequestConfig(options);
            return await axios
                .post<Res>(String(options.URL), body, { ...config })
                .then((res: AxiosResponse<Res>) => res.data);
        } catch (e: unknown) {
            const { status, message } = this.processError(e, options);
            if (BackendRepository.resolveIfCanRetry(status, options)) {
                const sessionData = await this.refreshTokens();
                if (sessionData) {
                    return this.post(body, { ...options, retry: false });
                } else {
                    toast.error('Inicia sesión Para hacer esta accion');
                }
            } else if (BackendRepository.resolveIfIsUnauthorized(status, message)) {
                toast.error('Inicia sesión Para hacer esta accion');
                SessionManageInstance.closeSession().then(() => {
                    window.history.pushState({}, '', AppRoutesConstants.LOGIN_PAGE);
                });
            }
            return undefined;
        } finally {
            if (process) LoadingSourceUseCase.removeLoaderProcess(process);
        }
    }

    public static async put<Res, Req extends Record<string, unknown>>(
        body: Req,
        options: BackendOptions,
    ): Promise<Res | undefined> {
        const process = options.createLoaderProcess ?? true ? LoadingSourceUseCase.addLoaderProcess() : undefined;
        try {
            const config: AxiosRequestConfig = await BackendRepository.buildRequestConfig(options);
            return await axios.put<Res>(String(options.URL), body, config).then((res: AxiosResponse<Res>) => res.data);
        } catch (e: unknown) {
            const { status, message } = this.processError(e, options);
            if (BackendRepository.resolveIfCanRetry(status, options)) {
                const sessionData = await this.refreshTokens();
                if (sessionData) {
                    await this.put(body, { ...options, retry: false });
                } else {
                    toast.error('Inicia sesión Para hacer esta accion');
                }
            } else if (BackendRepository.resolveIfIsUnauthorized(status, message)) {
                toast.error('Inicia sesión Para hacer esta accion');
                SessionManageInstance.closeSession().then(() => {
                    window.history.pushState({}, '', AppRoutesConstants.LOGIN_PAGE);
                });
            }
            return undefined;
        } finally {
            if (process) LoadingSourceUseCase.removeLoaderProcess(process);
        }
    }

    public static async patch<Res, Req extends Record<string, unknown>>(
        body: Req,
        options: BackendOptions,
    ): Promise<Res | undefined> {
        const process = options.createLoaderProcess ?? true ? LoadingSourceUseCase.addLoaderProcess() : undefined;
        try {
            const config: AxiosRequestConfig = await BackendRepository.buildRequestConfig(options);
            return await axios
                .patch<Res>(String(options.URL), body, config)
                .then((res: AxiosResponse<Res>) => res.data);
        } catch (e: unknown) {
            const { status, message } = this.processError(e, options);
            if (BackendRepository.resolveIfCanRetry(status, options)) {
                const sessionData = await this.refreshTokens();
                if (sessionData) {
                    await this.patch(body, { ...options, retry: false });
                } else {
                    toast.error('Inicia sesión Para hacer esta accion');
                }
            } else if (BackendRepository.resolveIfIsUnauthorized(status, message)) {
                toast.error('Inicia sesión Para hacer esta accion');
                SessionManageInstance.closeSession().then(() => {
                    window.history.pushState({}, '', AppRoutesConstants.LOGIN_PAGE);
                });
            }
            return undefined;
        } finally {
            if (process) LoadingSourceUseCase.removeLoaderProcess(process);
        }
    }

    public static async delete<Res, Req extends Record<string, unknown>>(
        query: Req,
        options: BackendOptions,
    ): Promise<Res | undefined> {
        const process = options.createLoaderProcess ?? true ? LoadingSourceUseCase.addLoaderProcess() : undefined;
        try {
            const config: AxiosRequestConfig = await BackendRepository.buildRequestConfig(options);
            config.params = query;
            return await axios.delete<Res>(String(options.URL), config).then((res: AxiosResponse<Res>) => res.data);
        } catch (e: unknown) {
            const { status, message } = this.processError(e, options);
            if (BackendRepository.resolveIfCanRetry(status, options)) {
                const sessionData = await this.refreshTokens();
                if (sessionData) {
                    await this.delete(query, { ...options, retry: false });
                } else {
                    toast.error('Inicia sesión Para hacer esta accion');
                }
            } else if (BackendRepository.resolveIfIsUnauthorized(status, message)) {
                toast.error('Inicia sesión Para hacer esta accion');
                SessionManageInstance.closeSession().then(() => {
                    window.history.pushState({}, '', AppRoutesConstants.LOGIN_PAGE);
                });
            }
            return undefined;
        } finally {
            if (process) LoadingSourceUseCase.removeLoaderProcess(process);
        }
    }
}
