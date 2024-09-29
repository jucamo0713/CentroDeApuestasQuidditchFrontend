export interface MatchFinData {
    date: Date;
    event: string;
    highlights: { description: string; time: string }[];
    imageA: string;
    imageB: string;
    location: string;
    matchId: string;
    scoreA: number;
    scoreB: number;
    status: string;
    teamA: string;
    teamB: string;
}
