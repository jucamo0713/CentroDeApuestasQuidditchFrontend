import { SessionData } from '../SessionData';

export interface AuthHttpRepository {
    loginUser(email: string, password: string): Promise<SessionData | undefined>;
}
