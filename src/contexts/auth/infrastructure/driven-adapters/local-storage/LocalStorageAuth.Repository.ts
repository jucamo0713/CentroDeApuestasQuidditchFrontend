import { AuthRepository } from '../../../domain/model/gateways/Auth.Repository';
import { SessionData } from '../../../domain/model/SessionData';
import { LocalStorageKeysConstants } from '../../../../shared/infrastructure/driven-adapters/local-storage/LocalStorageKeys.Constants';

export class LocalStorageAuthRepository implements AuthRepository {
    async getSessionData(): Promise<SessionData | undefined> {
        const data = localStorage.getItem(LocalStorageKeysConstants.AUTH_DATA);
        return data ? JSON.parse(data) : undefined;
    }

    async setSessionData(sessionData: SessionData): Promise<void> {
        localStorage.setItem(LocalStorageKeysConstants.AUTH_DATA, JSON.stringify(sessionData));
    }

    async unsetSessionData(): Promise<void> {
        localStorage.removeItem(LocalStorageKeysConstants.AUTH_DATA);
    }
}
