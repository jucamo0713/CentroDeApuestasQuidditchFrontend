import { Card, CardContent, Typography, Grid, Avatar, List, ListItem, ListItemText, Box } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

interface BetDetailsProp {
    date: string;
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

// Componente para mostrar los detalles de cada apuesta
const TeamCard: React.FC<{ score: number; scoreColor: string; team: { image: string; name: string } }> = ({
    score,
    scoreColor,
    team,
}) => (
    <Grid item xs={5} sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Avatar src={team.image} alt={team.name} sx={{ height: 100, width: 100 }} />
        <Typography variant="h6" sx={{ marginTop: '20px', textAlign: 'center' }}>
            {team.name}
        </Typography>
        <Typography variant="h4" sx={{ color: scoreColor, textAlign: 'center' }}>
            {score}
        </Typography>
    </Grid>
);

export const BetDetailPage: React.FC<BetDetailsProp> = ({
    date,
    money,
    teamA,
    teamB,
    scoreA,
    scoreB,
    status,
    multiplier,
}) => {
    return (
        <Box sx={{ backgroundColor: '#1c1613', color: '#fff', minHeight: '100vh', padding: '20px' }}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={5}>
                    <Card sx={{ backgroundColor: '#333', color: '#fff', padding: '20px' }}>
                        <CardContent>
                            <Grid container justifyContent="center" alignItems="center">
                                <TeamCard team={teamA} score={scoreA} scoreColor="#4caf50" />
                                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                                    <Typography variant="h5">VS</Typography>
                                </Grid>
                                <TeamCard team={teamB} score={scoreB} scoreColor="#f44336" />
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={7}>
                    <Card sx={{ backgroundColor: blueGrey[700] }}>
                        <CardContent>
                            <Typography variant="h5" sx={{ color: '#fff', marginBottom: '10px' }}>
                                Detalles de apuesta
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <>
                                                {/* Mostrar la fecha de la apuesta */}
                                                <Typography variant="body2" sx={{ color: '#eedd82' }}>
                                                    Fecha: {date}
                                                </Typography>

                                                {/* Mostrar el estada de la apuesta */}
                                                <Typography variant="body2" sx={{ color: '#eedd82' }}>
                                                    Estado: {status}
                                                </Typography>

                                                {/* Mostrar el dinero apostado */}
                                                <Typography variant="body2" sx={{ color: '#eedd82' }}>
                                                    Dinero apostado: {money}
                                                </Typography>

                                                {/* Mostrar el multiplicador */}
                                                <Typography variant="body2" sx={{ color: '#eedd82' }}>
                                                    Multiplicador: {multiplier}
                                                </Typography>

                                                {/* Calcular y mostrar el dinero ganado */}
                                                <Typography variant="body2" sx={{ color: '#eedd82' }}>
                                                    Dinero ganado: {money * multiplier}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default BetDetailPage;
