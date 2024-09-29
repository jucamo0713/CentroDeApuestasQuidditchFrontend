export interface BetDetailsData {
    date: string;
    id: string;
    money: number;
    multiplier: number;
    scoreA: number;
    scoreB: number;
    status: string;
    teamA: {
        image: string;
        name: string;
    };
    teamB: {
        image: string;
        name: string;
    };
}
