import { PaginatedModel } from '../../../shared/domain/model/PaginatedModel';
import { Bet } from '../model/Bet';
import { BetHttpRepository } from '../model/gateways/BetHttp.Repository';
import { SessionData } from '../../../auth/domain/model/SessionData';

export class BetUseCase {
    constructor(private readonly betHttpRepository: BetHttpRepository) {}

    async getBetsPaginated(page: number, limit: number, sessionData: SessionData): Promise<PaginatedModel<Bet>> {
        return this.betHttpRepository.getBetsPaginated(page, limit, sessionData);
    }
}
