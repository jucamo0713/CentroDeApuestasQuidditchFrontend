import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box, CircularProgress, Modal } from '@mui/material';
import MatchCard from './MatchCard';
import { MatchData } from '../../../../domain/model/matchData';
import { toast } from 'react-toastify';
import { BetUseCaseInstance } from '../../../../../bet/application/dependencyInjection/BetUseCaseInstance';
import { currencyConstants } from '../../../../../money/domain/model/currencyConstants';
import { RechargeForm } from '../../../../../money/infrastructure/entry-points/UI/components/RechargeForm';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import { useNavigate } from 'react-router-dom';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';

export function Matches() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<SessionData | undefined>(undefined);
    const [matches, setMatches] = useState<MatchData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
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
    }, []);

    if (loading) {
        return (
            <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h4" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

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
            <Typography
                variant="h2"
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
                Partidos
            </Typography>
            <Grid container spacing={3}>
                {matches.length > 0 ? (
                    matches.map((match) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={match.matchId}>
                            <MatchCard match={match} betAction={handleBetClick} />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1">No se encontraron partidos.</Typography>
                )}
            </Grid>
        </Box>
    );
}
