import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { MatchData } from '../../../../domain/model/matchData';

interface MatchCardProps {
    betAction: (type: string, matchId: string) => void;
    match: MatchData;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, betAction }) => {
    return (
        <Card
            sx={{
                backgroundColor: '#333',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'space-between',
            }}
        >
            <CardContent>
                <Typography variant="subtitle1" component="div" sx={{ color: '#eedd82' }}>
                    {match.date.toLocaleString()}
                </Typography>
                <Typography variant="h5" component="div">
                    {match.teamA} vs. {match.teamB}
                </Typography>
                <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={match.imageA}
                        alt={match.teamA}
                        sx={{ borderRadius: '50%', width: '45%' }}
                    />
                    <CardMedia
                        component="img"
                        height="140"
                        image={match.imageB}
                        alt={match.teamB}
                        sx={{ borderRadius: '50%', width: '45%' }}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                    <Button
                        sx={{ ':hover': { backgroundColor: blueGrey[400] }, backgroundColor: blueGrey[700] }}
                        variant="contained"
                        onClick={() => betAction('A', match.matchId)}
                    >
                        {match.teamA}: {match.odds.teamA}
                    </Button>
                    <Button
                        sx={{ ':hover': { backgroundColor: blueGrey[400] }, backgroundColor: blueGrey[700] }}
                        variant="contained"
                        onClick={() => betAction('DRAW', match.matchId)}
                    >
                        Empate: {match.odds.draw}
                    </Button>
                    <Button
                        sx={{ ':hover': { backgroundColor: blueGrey[400] }, backgroundColor: blueGrey[700] }}
                        variant="contained"
                        onClick={() => betAction('B', match.matchId)}
                    >
                        {match.teamB}: {match.odds.teamB}
                    </Button>
                    <Button variant="contained" color="info" component={Link} to={`/match/${match.matchId}`}>
                        Detalle
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MatchCard;
