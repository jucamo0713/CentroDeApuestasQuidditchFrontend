import { MoneyHttpRepository } from '../../../domain/model/gateways/MoneyHttp.Repository';
import { SessionData } from '../../../../auth/domain/model/SessionData';
import { MoneyData } from '../../../domain/model/MoneyData';

export class HttpMoneyRepository implements MoneyHttpRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getMoneyData(loginData: SessionData): Promise<MoneyData> {
        //TODO: implement backend
        return {
            galleons: 54,
            knuts: 5,
            sickles: 12,
        };
    }
}
