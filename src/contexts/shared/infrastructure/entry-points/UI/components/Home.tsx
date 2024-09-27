import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Button, Grid, Box } from '@mui/material';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';
import { AppRoutesConstants } from '../../../../domain/model/constants/AppRoutes.Constants';
import { blueGrey } from '@mui/material/colors';

// Definimos el tipo para los datos de los partidos
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

export function Home() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<SessionData | undefined>(undefined);
    const [matches, setMatches] = useState<MatchData[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Estado de carga

    // Cargar los datos de los partidos desde el archivo JSON
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('/matches.json');
                if (!response.ok) throw new Error('Error en la respuesta del servidor');
                const data: MatchData[] = await response.json();
                setMatches(data);
            } catch (error) {
                console.error('Error al cargar los datos de los partidos:', error);
            } finally {
                setLoading(false); // Finalizamos la carga
            }
        };

        fetchMatches();
    }, []);

    // Gestionar la sesión
    useEffect(() => {
        const subscription = SessionManageUseCase.subjectOfSessionData.subscribe(setLoginData);
        return () => subscription.unsubscribe();
    }, [navigate]);

    return (
        <Box
            sx={{ backgroundColor: '#1c1613', color: '#fff', minHeight: '100vh', padding: '20px', textAlign: 'center' }}
        >
            {!loginData && (
                <Card sx={{ backgroundColor: '#333', color: '#fff', padding: '20px' }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Bienvenido al Centro de Apuestas Quidditch
                        </Typography>
                        <Typography variant="body1">
                            La emoción del Quidditch en tus manos. ¿Listo para apostar?
                        </Typography>
                        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                            <Button
                                sx={{ ':hover': { backgroundColor: blueGrey[400] }, backgroundColor: blueGrey[700] }}
                                variant="contained"
                                component={Link}
                                to={AppRoutesConstants.LOGIN_PAGE}
                            >
                                Iniciar sesión
                            </Button>
                            <Button
                                variant="contained"
                                color="info"
                                component={Link}
                                to={AppRoutesConstants.SIGNUP_PAGE}
                            >
                                Regístrate
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            )}

            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontSize: {
                        lg: '3rem',
                        md: '2.5rem',
                        sm: '2rem',
                        xs: '1.5rem',
                    },
                }}
            >
                Partidos del Día
            </Typography>
            {loading ? (
                <Typography variant="body1">Cargando partidos...</Typography>
            ) : (
                <Grid container spacing={3}>
                    {matches.map((match, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: '10px',
                                            justifyContent: 'center',
                                            marginTop: '10px',
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={match.imageA}
                                            alt={match.teamA}
                                            sx={{ borderRadius: '50%', height: '140px', width: '140px' }}
                                        />
                                        <CardMedia
                                            alt={match.teamB}
                                            component="img"
                                            height="140"
                                            image={match.imageB}
                                            sx={{ borderRadius: '50%', height: '140px', width: '140px' }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px',
                                            marginTop: '10px',
                                        }}
                                    >
                                        <Button
                                            sx={{
                                                ':hover': { backgroundColor: blueGrey[400] },
                                                backgroundColor: blueGrey[700],
                                            }}
                                            variant="contained"
                                            onClick={() => alert(`Equipo ${match.teamA} seleccionado`)}
                                        >
                                            {match.teamA}: {match.A}
                                        </Button>
                                        <Button
                                            sx={{
                                                ':hover': { backgroundColor: blueGrey[400] },
                                                backgroundColor: blueGrey[700],
                                            }}
                                            variant="contained"
                                            onClick={() => alert('Empate seleccionado')}
                                        >
                                            Empate: {match.empate}
                                        </Button>
                                        <Button
                                            sx={{
                                                ':hover': { backgroundColor: blueGrey[400] },
                                                backgroundColor: blueGrey[700],
                                            }}
                                            variant="contained"
                                            onClick={() => alert(`Equipo ${match.teamB} seleccionado`)}
                                        >
                                            {match.teamB}: {match.B}
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="info"
                                            component={Link}
                                            to={`/match/${match.matchId}`}
                                        >
                                            Detalle
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
