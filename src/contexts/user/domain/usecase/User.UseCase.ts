import { SessionData } from '../../../auth/domain/model/SessionData';
import { User } from '../model/User';
import { UserHttpRepository } from '../model/gateways/UserHttp.Repository';

export class UserUseCase {
    constructor(private readonly httpRepository: UserHttpRepository) {}

    async getUser(session: SessionData): Promise<User> {
        return this.httpRepository.getUser(session);
    }

    async updateUser(
        email: string,
        username: string,
        birthDate: Date,
        name: string,
        loginData: SessionData,
    ): Promise<User> {
        return this.httpRepository.updateUser(email, username, birthDate, name, loginData);
    }
}
