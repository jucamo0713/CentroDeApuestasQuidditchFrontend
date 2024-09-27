import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box, CircularProgress } from '@mui/material';
import MatchCard from './MatchCard';

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

export function Matches() {
    const [matches, setMatches] = useState<MatchData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                    setMatches(data);
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

    return (
        <Box
            sx={{ backgroundColor: '#1c1613', color: '#fff', minHeight: '100vh', padding: '20px', textAlign: 'center' }}
        >
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
                            <MatchCard match={match} />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1">No se encontraron partidos.</Typography>
                )}
            </Grid>
        </Box>
    );
}
