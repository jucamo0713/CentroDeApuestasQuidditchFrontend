import { User } from '../User';
import { SessionData } from '../../../../auth/domain/model/SessionData';

export interface UserHttpRepository {
    getUser(session: SessionData): Promise<User>;

    updatePassword(password: string, loginData: SessionData): Promise<User>;

    updateUser(email: string, username: string, name: string, loginData: SessionData): Promise<User>;
}
