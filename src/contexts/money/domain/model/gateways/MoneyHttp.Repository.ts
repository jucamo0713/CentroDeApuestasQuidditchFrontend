import { MoneyData } from '../MoneyData';
import { SessionData } from '../../../../auth/domain/model/SessionData';

export interface MoneyHttpRepository {
    getMoneyData(loginData: SessionData): Promise<MoneyData>;
}
