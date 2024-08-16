import { SessionManageUseCase } from '../../domain/usecase/SessionManage.UseCase';
import { LocalStorageAuthRepository } from '../../infrastructure/driven-adapters/local-storage/LocalStorageAuth.Repository';
import { HttpAuthRepository } from '../../infrastructure/driven-adapters/http/HttpAuth.Repository';

export const SessionManageInstance = new SessionManageUseCase(
    new LocalStorageAuthRepository(),
    new HttpAuthRepository(),
);
SessionManageInstance.loadSessionData().finally(() => {
    console.log('SessionDataLoaded');
});
