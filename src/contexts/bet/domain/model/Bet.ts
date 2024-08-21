import { MoneyData } from '../../../money/domain/model/MoneyData';

export interface Bet {
    betId: string;
    finished: boolean;
    profit: number;
    value: MoneyData;
    won?: boolean;
}
