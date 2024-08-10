import { Observable, Subject } from 'rxjs';

export abstract class LoadingSourceUseCase {
    private static readonly _loadingSourceSubject = new Subject<boolean>();
    private static _currentLoading = false;

    static setLoading() {
        this._currentLoading = true;
        this._loadingSourceSubject.next(true);
    }
    static unsetLoading() {
        this._currentLoading = false;
        this._loadingSourceSubject.next(false);
    }

    static get loadingSourceSubject(): Observable<boolean> {
        return this._loadingSourceSubject.asObservable();
    }

    static get currentLoading(): boolean {
        return this._currentLoading;
    }
}
