import { SessionData } from '../SessionData';

export interface AuthRepository {
    getSessionData(): Promise<SessionData | undefined>;

    setSessionData(sessionData: SessionData): Promise<void>;

    unsetSessionData(): Promise<void>;
}
