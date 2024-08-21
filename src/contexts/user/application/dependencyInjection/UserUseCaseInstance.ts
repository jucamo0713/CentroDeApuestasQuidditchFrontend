import { HttpUserRepository } from '../../infrastructure/driven-adapters/http/HttpUser.Repository';
import { UserUseCase } from '../../domain/usecase/User.UseCase';

export const UserUseCaseInstance = new UserUseCase(new HttpUserRepository());
