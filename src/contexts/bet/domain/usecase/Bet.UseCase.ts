import { PaginatedModel } from '../../../shared/domain/model/PaginatedModel';
import { Bet } from '../model/Bet';
import { BetHttpRepository } from '../model/gateways/BetHttp.Repository';
import { SessionData } from '../../../auth/domain/model/SessionData';
import { currencyConstants } from '../../../money/domain/model/currencyConstants';

export class BetUseCase {
    constructor(private readonly betHttpRepository: BetHttpRepository) {}

    async getBetsPaginated(page: number, limit: number, sessionData: SessionData): Promise<PaginatedModel<Bet>> {
        return this.betHttpRepository.getBetsPaginated(page, limit, sessionData);
    }

    async create(amount: number, currency: string, betType: string, matchId: string): Promise<boolean> {
        const betValueData = {
            galleons: currency === currencyConstants.GALLEONS ? amount : 0,
            knuts: currency === currencyConstants.KNUTS ? amount : 0,
            sickles: currency === currencyConstants.SICKLES ? amount : 0,
        };

        return this.betHttpRepository.create(betValueData, betType, matchId);
    }
}
