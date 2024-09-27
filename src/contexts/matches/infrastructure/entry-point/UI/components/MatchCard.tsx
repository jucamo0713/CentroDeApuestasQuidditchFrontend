import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

interface MatchData {
    A: string;
    B: string;
    empate: string;
    imageA: string;
    imageB: string;
    matchId: string;
    teamA: string;
    teamB: string;
}

interface MatchCardProps {
    match: MatchData;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
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
                        onClick={() => alert(`Equipo ${match.teamA} seleccionado`)}
                    >
                        {match.teamA}: {match.A}
                    </Button>
                    <Button
                        sx={{ ':hover': { backgroundColor: blueGrey[400] }, backgroundColor: blueGrey[700] }}
                        variant="contained"
                        onClick={() => alert('Empate seleccionado')}
                    >
                        Empate: {match.empate}
                    </Button>
                    <Button
                        sx={{ ':hover': { backgroundColor: blueGrey[400] }, backgroundColor: blueGrey[700] }}
                        variant="contained"
                        onClick={() => alert(`Equipo ${match.teamB} seleccionado`)}
                    >
                        {match.teamB}: {match.B}
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
