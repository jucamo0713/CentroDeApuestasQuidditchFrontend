import { User } from '../User';
import { SessionData } from '../../../../auth/domain/model/SessionData';

export interface UserHttpRepository {
    getUser(session: SessionData): Promise<User>;

    updateUser(email: string, username: string, birthDate: Date, name: string, loginData: SessionData): Promise<User>;
}
