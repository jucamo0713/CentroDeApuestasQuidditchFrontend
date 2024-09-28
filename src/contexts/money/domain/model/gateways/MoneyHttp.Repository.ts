import { MoneyData } from '../MoneyData';
import { SessionData } from '../../../../auth/domain/model/SessionData';

export interface MoneyHttpRepository {
    getMoneyData(): Promise<MoneyData | undefined>;

    rechargeMoney(moneyToRecharge: MoneyData, loginData: SessionData): Promise<MoneyData | undefined>;
}
