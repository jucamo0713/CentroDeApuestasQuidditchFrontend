export interface MatchDetailData {
    date: Date;
    event: string;
    highlights: { description: string; time: string }[];
    imageA: string;
    imageB: string;
    matchId: string;
    odds: { draw: number; teamA: number; teamB: number };
    scoreA: number;
    scoreB: number;
    status: string;
    teamA: string;
    teamB: string;
}
