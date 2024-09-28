import { SessionData } from '../../../auth/domain/model/SessionData';
import { User } from '../model/User';
import { UserHttpRepository } from '../model/gateways/UserHttp.Repository';

export class UserUseCase {
    constructor(private readonly httpRepository: UserHttpRepository) {}

    async getUser(): Promise<User | undefined> {
        return this.httpRepository.getUser();
    }

    async updateUser(email: string, username: string, name: string, loginData: SessionData): Promise<User> {
        return this.httpRepository.updateUser(email, username, name, loginData);
    }

    async updatePassword(password: string, loginData: SessionData): Promise<User> {
        return this.httpRepository.updatePassword(password, loginData);
    }

    async signupUser(
        email: string,
        password: string,
        name: string,
        username: string,
    ): Promise<SessionData | undefined> {
        return this.httpRepository.signup(email, password, name, username);
    }
}
