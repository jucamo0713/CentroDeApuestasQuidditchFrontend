import { SessionData } from '../../../../auth/domain/model/SessionData';
import { User } from '../../../domain/model/User';
import { UserHttpRepository } from '../../../domain/model/gateways/UserHttp.Repository';
import { BackendRepository } from '../../../../shared/infrastructure/driven-adapters/bck/backend.repository';
import { BackendUrlConstants } from '../../../../shared/infrastructure/driven-adapters/bck/backend-url.constants';

export class HttpUserRepository implements UserHttpRepository {
    //TODO: delete
    private static exampleUser: User = {
        email: 'harrypotter@gmail.com',
        fullName: 'Harry James Potter',
        password: 'hh',
        username: 'H.J.Potter',
    };

    async getUser(): Promise<User | undefined> {
        const data = await BackendRepository.get<{
            email: string;
            fullName: string;
            success: boolean;
            username: string;
        }>({
            URL: BackendUrlConstants.ME,
        });
        return data
            ? {
                  email: data?.email,
                  fullName: data?.fullName,
                  password: '',
                  username: data.username,
              }
            : undefined;
    }

    async updateUser(email: string, username: string, name: string): Promise<User> {
        HttpUserRepository.exampleUser.email = email;
        HttpUserRepository.exampleUser.username = username;
        HttpUserRepository.exampleUser.fullName = name;
        return HttpUserRepository.exampleUser;
    }

    async updatePassword(password: string): Promise<User> {
        HttpUserRepository.exampleUser.password = password;
        return HttpUserRepository.exampleUser;
    }

    async signup(email: string, password: string, name: string, username: string): Promise<SessionData | undefined> {
        const data = await BackendRepository.post<
            SessionData,
            {
                email: string;
                fullName: string;
                password: string;
                username: string;
            }
        >(
            {
                email,
                fullName: name,
                password,
                username,
            },
            {
                URL: BackendUrlConstants.SIGNUP,
                requireAccessToken: false,
                retry: false,
            },
        );
        return data
            ? {
                  refreshToken: data?.refreshToken,
                  token: data?.token,
              }
            : undefined;
    }
}
