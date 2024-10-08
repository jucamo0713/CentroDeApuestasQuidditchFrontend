import { MoneyData } from '../model/MoneyData';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { MoneyHttpRepository } from '../model/gateways/MoneyHttp.Repository';

export class MoneyManageUseCase {
    public static readonly MoneyData$ = new BehaviorSubject<MoneyData | undefined>(undefined);

    constructor(private readonly httpMoneyRepository: MoneyHttpRepository) {}

    async findMoneyData(): Promise<MoneyData | undefined> {
        const updatedMoneyData = await this.httpMoneyRepository.getMoneyData();
        const currentData = await firstValueFrom(MoneyManageUseCase.MoneyData$);
        if (
            updatedMoneyData &&
            (!currentData ||
                currentData.galleons !== updatedMoneyData.galleons ||
                currentData.sickles !== updatedMoneyData.sickles ||
                currentData.knuts !== updatedMoneyData.knuts)
        ) {
            MoneyManageUseCase.MoneyData$.next(updatedMoneyData);
            return updatedMoneyData;
        }
        return currentData;
    }

    async rechargeMoney(moneyToRecharge: MoneyData): Promise<MoneyData | undefined> {
        const updatedMoneyData: MoneyData | undefined = await this.httpMoneyRepository.rechargeMoney(moneyToRecharge);
        const currentData = await firstValueFrom(MoneyManageUseCase.MoneyData$);
        if (
            updatedMoneyData &&
            (!currentData ||
                currentData.galleons !== updatedMoneyData.galleons ||
                currentData.sickles !== updatedMoneyData.sickles ||
                currentData.knuts !== updatedMoneyData.knuts)
        ) {
            MoneyManageUseCase.MoneyData$.next(updatedMoneyData);
            return updatedMoneyData;
        }
        return currentData;
    }
}
