import { AuthHttpRepository } from '../../../domain/model/gateways/AuthHttp.Repository';
import { SessionData } from '../../../domain/model/SessionData';
import { BackendRepository } from '../../../../shared/infrastructure/driven-adapters/bck/backend.repository';
import { BackendUrlConstants } from '../../../../shared/infrastructure/driven-adapters/bck/backend-url.constants';

export class HttpAuthRepository implements AuthHttpRepository {
    async loginUser(email: string, password: string): Promise<SessionData | undefined> {
        const response = await BackendRepository.post<SessionData, { email: string; password: string }>(
            {
                email,
                password,
            },
            {
                URL: BackendUrlConstants.LOGIN,
                customErrorMessage: 'Correo o contraseña incorretos',
                requireAccessToken: false,
                retry: false,
            },
        );
        return response
            ? {
                  refreshToken: response.refreshToken,
                  token: response.token,
              }
            : undefined;
    }
}
