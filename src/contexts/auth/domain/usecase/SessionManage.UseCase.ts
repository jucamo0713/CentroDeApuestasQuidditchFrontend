import { Observable, Subject } from 'rxjs';
import { SessionData } from '../model/SessionData';
import { AuthRepository } from '../model/gateways/Auth.Repository';
import { AuthHttpRepository } from '../model/gateways/AuthHttp.Repository';

export class SessionManageUseCase {
    private static subjectOfSessionData = new Subject<SessionData>();

    constructor(
        private authRepository: AuthRepository,
        private authHttpRepository: AuthHttpRepository,
    ) {}

    public async getSessionData(): Promise<[SessionData | undefined, Observable<SessionData>]> {
        const currentSessionData = await this.authRepository.getSessionData();
        return [currentSessionData, SessionManageUseCase.subjectOfSessionData.asObservable()];
    }

    public async loginUser(email: string, password: string): Promise<void> {
        const sessionData: SessionData = await this.authHttpRepository.loginUser(email, password);
        await this.authRepository.setSessionData(sessionData);
        SessionManageUseCase.subjectOfSessionData.next(sessionData);
    }
}
