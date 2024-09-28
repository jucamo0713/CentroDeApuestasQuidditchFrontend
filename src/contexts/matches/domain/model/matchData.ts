export interface MatchData {
    date: Date;
    imageA: string;
    imageB: string;
    matchId: string;
    odds: { draw: number; teamA: number; teamB: number };
    status: string;
    teamA: string;
    teamB: string;
}
