import { BehaviorSubject, Observable } from 'rxjs';
import { v4 } from 'uuid';

export abstract class LoadingSourceUseCase {
    private static readonly _loadingSourceSubject = new BehaviorSubject<boolean>(false);
    private static loadProcess = new Set<string>();

    public static addLoaderProcess(): string {
        const process = v4();
        const sendEvent = this.loadProcess.size === 0;
        this.loadProcess.add(process);
        if (sendEvent) {
            this._loadingSourceSubject.next(true);
        }
        return process;
    }

    public static removeLoaderProcess(process: string): void {
        this.loadProcess.delete(process);
        if (this.loadProcess.size === 0) {
            this._loadingSourceSubject.next(false);
        }
    }

    static get loadingSource$(): Observable<boolean> {
        return this._loadingSourceSubject.asObservable();
    }
}
