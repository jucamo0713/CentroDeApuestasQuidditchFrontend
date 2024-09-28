import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Button, Grid, Box, Modal } from '@mui/material';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';
import { AppRoutesConstants } from '../../../../domain/model/constants/AppRoutes.Constants';
import { blueGrey } from '@mui/material/colors';
import { MatchData } from '../../../../../matches/domain/model/matchData';
import { toast } from 'react-toastify';
import { BetUseCaseInstance } from '../../../../../bet/application/dependencyInjection/BetUseCaseInstance';
import { currencyConstants } from '../../../../../money/domain/model/currencyConstants';
import { RechargeForm } from '../../../../../money/infrastructure/entry-points/UI/components/RechargeForm';

export function Home() {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [loginData, setLoginData] = useState<SessionData | undefined>(undefined);
    const [matches, setMatches] = useState<MatchData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [matchSelected, setMatchSelected] = useState<string | undefined>(undefined);
    const [betType, SetBetType] = useState<string | undefined>(undefined);
    const [amount, setAmount] = useState<string>('0');
    const [selectedCurrency, setSelectedCurrency] = useState<string>('galleons');

    const style = {
        bgcolor: '#333',
        border: '2px solid #000',
        boxShadow: 24,
        left: '50%',
        p: 4,
        position: 'absolute' as const,
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
    };

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        const amountValue = parseInt(amount);
        if (isNaN(amountValue) || amountValue < 1) {
            toast.error('El valor debe ser un número positivo.');
        } else if (!betType) {
            toast.error('Error debe seleccionar tipo de apuesta');
        } else if (!matchSelected) {
            toast.error('Error debe equipo para apostar');
        } else {
            BetUseCaseInstance.create(amountValue, selectedCurrency, betType, matchSelected).then((val) => {
                if (val) {
                    toast.success('Realizaste la apuesta correctamente');
                    setModalIsOpen(false);
                    setAmount('0');
                    setSelectedCurrency(currencyConstants.GALLEONS);
                    SetBetType(undefined);
                    setMatchSelected(undefined);
                }
            });
        }
    };

    useEffect(() => {
        let isMounted = true;

        const fetchMatches = async () => {
            try {
                const response = await fetch('/matches.json');
                if (!response.ok) {
                    throw new Error('Error al cargar los partidos');
                }
                const data = await response.json();
                if (isMounted) {
                    setMatches(
                        data.map((v: MatchData) => {
                            return { ...v, date: new Date(v.date) };
                        }),
                    );
                    setLoading(false);
                }
            } catch (err: unknown) {
                if (isMounted) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError('Error desconocido');
                    }
                    setLoading(false);
                }
            }
        };

        fetchMatches();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const subscription = SessionManageUseCase.subjectOfSessionData.subscribe(setLoginData);
        return () => subscription.unsubscribe();
    }, [navigate]);

    const handleBetClick = (type: string, matchId: string) => {
        if (!loginData) {
            navigate(AppRoutesConstants.LOGIN_PAGE);
        } else {
            setModalIsOpen(true);
            setMatchSelected(matchId);
            SetBetType(type);
        }
    };

    return (
        <Box
            sx={{ backgroundColor: '#1c1613', color: '#fff', minHeight: '100vh', padding: '20px', textAlign: 'center' }}
        >
            <Modal
                open={modalIsOpen}
                onClose={() => {
                    setModalIsOpen(false);
                    setMatchSelected(undefined);
                    SetBetType(undefined);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <RechargeForm
                        handleSubmit={handlePay}
                        selectedCurrency={selectedCurrency}
                        setSelectedCurrency={setSelectedCurrency}
                        amount={amount}
                        setAmount={setAmount}
                    />
                </Box>
            </Modal>
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
                                    <Typography variant="subtitle1" component="div" sx={{ color: '#eedd82' }}>
                                        {match.date.toLocaleString()}
                                    </Typography>
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
                                            onClick={() => handleBetClick('A', match.matchId)}
                                        >
                                            {match.teamA}: {match.odds.teamA}
                                        </Button>
                                        <Button
                                            sx={{
                                                ':hover': { backgroundColor: blueGrey[400] },
                                                backgroundColor: blueGrey[700],
                                            }}
                                            variant="contained"
                                            onClick={() => handleBetClick('DRAW', match.matchId)}
                                        >
                                            Empate: {match.odds.draw}
                                        </Button>
                                        <Button
                                            sx={{
                                                ':hover': { backgroundColor: blueGrey[400] },
                                                backgroundColor: blueGrey[700],
                                            }}
                                            variant="contained"
                                            onClick={() => handleBetClick('B', match.matchId)}
                                        >
                                            {match.teamB}: {match.odds.teamB}
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
