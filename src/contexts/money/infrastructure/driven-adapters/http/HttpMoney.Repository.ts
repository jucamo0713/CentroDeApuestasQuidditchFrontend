import { MoneyHttpRepository } from '../../../domain/model/gateways/MoneyHttp.Repository';
import { MoneyData } from '../../../domain/model/MoneyData';
import { BackendRepository } from '../../../../shared/infrastructure/driven-adapters/bck/backend.repository';
import { BackendUrlConstants } from '../../../../shared/infrastructure/driven-adapters/bck/backend-url.constants';

export class HttpMoneyRepository implements MoneyHttpRepository {
    private static data = {
        galleons: 54,
        knuts: 5,
        sickles: 12,
    };

    async getMoneyData(): Promise<MoneyData | undefined> {
        const data = await BackendRepository.get<{
            galleons: number;
            knuts: number;
            sickles: number;
            success: boolean;
        }>({ URL: BackendUrlConstants.GET_MONEY });
        return data
            ? {
                  galleons: data.galleons,
                  knuts: data.knuts,
                  sickles: data.sickles,
              }
            : undefined;
    }

    async rechargeMoney(moneyToRecharge: MoneyData): Promise<MoneyData | undefined> {
        const data = await BackendRepository.patch<
            {
                galleons: number;
                knuts: number;
                sickles: number;
                success: boolean;
            },
            {
                galleons: number;
                knuts: number;
                sickles: number;
            }
        >({ ...moneyToRecharge }, { URL: BackendUrlConstants.RECHARGE_MONEY });
        return data
            ? {
                  galleons: data.galleons,
                  knuts: data.knuts,
                  sickles: data.sickles,
              }
            : undefined;
    }
}
