import { MoneyHttpRepository } from '../../../domain/model/gateways/MoneyHttp.Repository';
import { SessionData } from '../../../../auth/domain/model/SessionData';
import { MoneyData } from '../../../domain/model/MoneyData';

export class HttpMoneyRepository implements MoneyHttpRepository {
    private static data = {
        galleons: 54,
        knuts: 5,
        sickles: 12,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getMoneyData(loginData: SessionData): Promise<MoneyData> {
        //TODO: implement backend
        return HttpMoneyRepository.data;
    }

    //TODO
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async rechargeMoney(moneyToRecharge: MoneyData, loginData: SessionData): Promise<MoneyData> {
        const aux = { ...HttpMoneyRepository.data };
        aux.knuts += moneyToRecharge.knuts;
        const aux1 = Math.floor(aux.knuts / 29);
        aux.knuts = aux.knuts % 29;
        aux.sickles += moneyToRecharge.sickles + aux1;
        const aux2 = Math.floor(aux.sickles / 17);
        aux.sickles = aux.sickles % 17;
        aux.galleons += moneyToRecharge.galleons + aux2;
        HttpMoneyRepository.data = aux;
        return HttpMoneyRepository.data;
    }
}
