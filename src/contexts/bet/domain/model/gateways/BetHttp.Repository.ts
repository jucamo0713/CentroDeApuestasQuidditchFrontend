import { SessionData } from '../../../../auth/domain/model/SessionData';
import { MoneyData } from '../../../../money/domain/model/MoneyData';
import { PaginatedModel } from '../../../../shared/domain/model/PaginatedModel';
import { Bet } from '../Bet';

export interface BetHttpRepository {
    create(betValue: MoneyData, betType: string, matchId: string): Promise<boolean>;
    getBetsPaginated(page: number, limit: number, sessionData: SessionData): Promise<PaginatedModel<Bet>>;
}
