import { BehaviorSubject, Observable } from 'rxjs';
import { SessionData } from '../model/SessionData';
import { AuthRepository } from '../model/gateways/Auth.Repository';
import { AuthHttpRepository } from '../model/gateways/AuthHttp.Repository';

export class SessionManageUseCase {
    private static _subjectOfSessionData = new BehaviorSubject<SessionData | undefined>(undefined);

    constructor(
        private authRepository: AuthRepository,
        private authHttpRepository: AuthHttpRepository,
    ) {}

    public async loadSessionData(): Promise<void> {
        SessionManageUseCase._subjectOfSessionData.next(await this.authRepository.getSessionData());
    }

    public async saveSessionData(data: SessionData): Promise<void> {
        SessionManageUseCase._subjectOfSessionData.next(data);
        await this.authRepository.setSessionData(data);
    }

    public async loginUser(email: string, password: string): Promise<void> {
        const sessionData: SessionData | undefined = await this.authHttpRepository.loginUser(email, password);
        if (sessionData) {
            await this.authRepository.setSessionData(sessionData);
        } else {
            await this.authRepository.unsetSessionData();
        }
        SessionManageUseCase._subjectOfSessionData.next(sessionData);
    }

    public async closeSession() {
        await this.authRepository.unsetSessionData();
        SessionManageUseCase._subjectOfSessionData.next(undefined);
    }

    static get subjectOfSessionData(): Observable<SessionData | undefined> {
        return this._subjectOfSessionData.asObservable();
    }
}
