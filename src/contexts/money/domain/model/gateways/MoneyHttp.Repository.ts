import { MoneyData } from '../MoneyData';

export interface MoneyHttpRepository {
    getMoneyData(): Promise<MoneyData | undefined>;

    rechargeMoney(moneyToRecharge: MoneyData): Promise<MoneyData | undefined>;
}
