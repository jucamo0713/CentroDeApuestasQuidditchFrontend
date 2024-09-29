import { Card, CardContent, Typography, Grid, Avatar, List, ListItem, ListItemText, Box, Divider } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { MatchFinData } from '../../../../../matches/domain/model/matchFinData';

// Componente para mostrar los detalles de cada partido
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

export const MatchDetailPage: React.FC<MatchFinData> = ({
    date,
    teamA,
    teamB,
    scoreA,
    scoreB,
    imageA,
    imageB,
    highlights,
    location,
    event,
}) => {
    return (
        <Box sx={{ backgroundColor: '#1c1613', color: '#fff', minHeight: '100vh', padding: '20px' }}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={5}>
                    <Card sx={{ backgroundColor: '#333', color: '#fff', padding: '20px' }}>
                        <CardContent>
                            <Grid container justifyContent="center" alignItems="center">
                                <TeamCard team={{ image: imageA, name: teamA }} score={scoreA} scoreColor="#4caf50" />
                                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                                    <Typography variant="h5">VS</Typography>
                                </Grid>
                                <TeamCard team={{ image: imageB, name: teamB }} score={scoreB} scoreColor="#f44336" />
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={7}>
                    <Card sx={{ backgroundColor: blueGrey[700] }}>
                        <CardContent>
                            <Typography variant="h5" sx={{ color: '#fff', marginBottom: '10px' }}>
                                Detalles del partido
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            <>
                                                {/* Mostrar la fecha del partido */}
                                                <Typography variant="body2" sx={{ color: '#eedd82' }}>
                                                    Fecha: {date.toLocaleString()}
                                                </Typography>

                                                {/* Mostrar la ubicación del partido */}
                                                <Typography variant="body2" sx={{ color: '#eedd82' }}>
                                                    Ubicación: {location}
                                                </Typography>

                                                {/* Mostrar la ubicación del partido */}
                                                <Typography variant="body2" sx={{ color: '#eedd82' }}>
                                                    Evento: {event}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </CardContent>
                        <CardContent>
                            <Typography variant="h5" sx={{ color: '#fff', marginBottom: '10px' }}>
                                Jugadas destacadas
                            </Typography>
                            <List>
                                {highlights.map((highlight, index) => (
                                    <ListItem key={index}>
                                        <ListItemText
                                            sx={{ color: '#fff' }}
                                            primary={highlight.description}
                                            secondary={`Minuto: ${highlight.time}`}
                                            secondaryTypographyProps={{ sx: { color: '#eedd82' } }}
                                        />
                                        {index < highlights.length - 1 && <Divider sx={{ backgroundColor: '#333' }} />}
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MatchDetailPage;
