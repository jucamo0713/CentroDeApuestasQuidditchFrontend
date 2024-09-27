import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Avatar,
    List,
    ListItem,
    ListItemText,
    Box,
    Divider,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { blueGrey } from '@mui/material/colors';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';

interface MatchDetailsProps {
    highlights: { description: string; time: string }[];
    odds: { draw: number; teamA: number; teamB: number }; // Agregamos las cuotas de ganancia
    scoreA: number;
    scoreB: number;
    teamA: {
        image: string;
        name: string;
    };
    teamB: {
        image: string;
        name: string;
    };
}

// Componente para mostrar los detalles de cada equipo
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

export const MatchDetails: React.FC<MatchDetailsProps> = ({ teamA, teamB, scoreA, scoreB, highlights, odds }) => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<SessionData | undefined>(undefined);

    // Gestionar la sesión
    useEffect(() => {
        const subscription = SessionManageUseCase.subjectOfSessionData.subscribe(setLoginData);
        return () => subscription.unsubscribe();
    }, []);

    // Función para manejar la apuesta (redirige a la página de login si no hay sesión)
    const handleBet = (team: string) => {
        if (!loginData) {
            navigate(AppRoutesConstants.LOGIN_PAGE);
        } else {
            alert(`Apuesta realizada por ${team}`);
        }
    };

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

                            {/* Botones de apuesta */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px',
                                    marginTop: '20px',
                                }}
                            >
                                <Button
                                    sx={{
                                        ':hover': { backgroundColor: blueGrey[400] },
                                        backgroundColor: blueGrey[700],
                                    }}
                                    variant="contained"
                                    onClick={() => handleBet(teamA.name)}
                                >
                                    {teamA.name} - {odds.teamA}
                                </Button>
                                <Button
                                    sx={{
                                        ':hover': { backgroundColor: blueGrey[400] },
                                        backgroundColor: blueGrey[700],
                                    }}
                                    variant="contained"
                                    onClick={() => handleBet('Empate')}
                                >
                                    Empate - {odds.draw}
                                </Button>
                                <Button
                                    sx={{
                                        ':hover': { backgroundColor: blueGrey[400] },
                                        backgroundColor: blueGrey[700],
                                    }}
                                    variant="contained"
                                    onClick={() => handleBet(teamB.name)}
                                >
                                    {teamB.name} - {odds.teamB}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={7}>
                    <Card sx={{ backgroundColor: blueGrey[700] }}>
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

export default MatchDetails;
