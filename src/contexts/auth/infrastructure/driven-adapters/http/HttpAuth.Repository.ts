import { AuthHttpRepository } from '../../../domain/model/gateways/AuthHttp.Repository';
import { SessionData } from '../../../domain/model/SessionData';

export class HttpAuthRepository implements AuthHttpRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async loginUser(email: string, password: string): Promise<SessionData> {
        // TODO: Integrate to backend
        return {
            refreshToken: 'BEARER FALSETOKEN',
            token: 'BEARER FALSETOKEN',
        };
    }
}
