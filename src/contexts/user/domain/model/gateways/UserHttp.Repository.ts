import { User } from '../User';
import { SessionData } from '../../../../auth/domain/model/SessionData';

export interface UserHttpRepository {
    getUser(session: SessionData): Promise<User>;

    signup(email: string, password: string, name: string, username: string): Promise<SessionData | undefined>;

    updatePassword(password: string, loginData: SessionData): Promise<User>;

    updateUser(email: string, username: string, name: string, loginData: SessionData): Promise<User>;
}
