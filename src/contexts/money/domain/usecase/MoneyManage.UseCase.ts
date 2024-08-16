import { MoneyData } from '../model/MoneyData';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { SessionData } from '../../../auth/domain/model/SessionData';
import { MoneyHttpRepository } from '../model/gateways/MoneyHttp.Repository';

export class MoneyManageUseCase {
    public static readonly MoneyData$ = new BehaviorSubject<MoneyData | undefined>(undefined);

    constructor(private readonly httpMoneyRepository: MoneyHttpRepository) {}

    async findMoneyData(loginData: SessionData): Promise<MoneyData> {
        const updatedMoneyData = await this.httpMoneyRepository.getMoneyData(loginData);
        const currentData = await firstValueFrom(MoneyManageUseCase.MoneyData$);
        if (
            !currentData ||
            currentData.galleons !== updatedMoneyData.galleons ||
            currentData.sickles !== updatedMoneyData.sickles ||
            currentData.knuts !== updatedMoneyData.knuts
        ) {
            MoneyManageUseCase.MoneyData$.next(updatedMoneyData);
            return updatedMoneyData;
        }
        return currentData;
    }
}
