import { SessionData } from '../../../../auth/domain/model/SessionData';
import { PaginatedModel } from '../../../../shared/domain/model/PaginatedModel';
import { Bet } from '../Bet';

export interface BetHttpRepository {
    getBetsPaginated(page: number, limit: number, sessionData: SessionData): Promise<PaginatedModel<Bet>>;
}
