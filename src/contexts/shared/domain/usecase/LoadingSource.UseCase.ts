import { BehaviorSubject, Observable } from 'rxjs';

export abstract class LoadingSourceUseCase {
    private static readonly _loadingSourceSubject = new BehaviorSubject<boolean>(false);

    static setLoading() {
        this._loadingSourceSubject.next(true);
    }

    static unsetLoading() {
        this._loadingSourceSubject.next(false);
    }

    static get loadingSource$(): Observable<boolean> {
        return this._loadingSourceSubject.asObservable();
    }
}
