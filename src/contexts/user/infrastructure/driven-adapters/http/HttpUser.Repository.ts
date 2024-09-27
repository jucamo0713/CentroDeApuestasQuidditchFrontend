import { SessionData } from '../../../../auth/domain/model/SessionData';
import { User } from '../../../domain/model/User';
import { UserHttpRepository } from '../../../domain/model/gateways/UserHttp.Repository';

export class HttpUserRepository implements UserHttpRepository {
    //TODO: delete
    private static exampleUser: User = {
        email: 'harrypotter@gmail.com',
        fullName: 'Harry James Potter',
        password: 'hh',
        username: 'H.J.Potter',
    };
    //TODO:
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getUser(sessionData: SessionData): Promise<User> {
        return HttpUserRepository.exampleUser;
    }

    async updateUser(
        email: string,
        username: string,
        name: string,
        //TODO:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        loginData: SessionData,
    ): Promise<User> {
        HttpUserRepository.exampleUser.email = email;
        HttpUserRepository.exampleUser.username = username;
        HttpUserRepository.exampleUser.fullName = name;
        return HttpUserRepository.exampleUser;
    }

    async updatePassword(
        password: string,
        //TODO:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        loginData: SessionData,
    ): Promise<User> {
        HttpUserRepository.exampleUser.password = password;
        return HttpUserRepository.exampleUser;
    }
}
