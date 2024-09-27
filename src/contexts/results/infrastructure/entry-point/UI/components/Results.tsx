import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Typography,
    Card,
    CardContent,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
} from '@mui/material';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import './Results.css';

interface MatchData {
    result: string;
    teamA: string;
    teamB: string;
    teamWinning: string;
}

export function Results() {
    const [matches, setMatches] = useState<MatchData[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Estado para la carga

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('/results.json');
                if (!response.ok) throw new Error('Error en la respuesta del servidor');
                const data = await response.json();
                setMatches(data);
            } catch (error) {
                console.error('Error al cargar los datos de los partidos:', error);
            } finally {
                setLoading(false); // Finalizamos la carga
            }
        };

        fetchMatches();
    }, []);

    return (
        <Box
            sx={{
                alignItems: 'center',
                backgroundColor: '#1c1613',
                color: '#fff',
                display: 'flex',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '25px',
                textAlign: 'center',
            }}
        >
            <Card sx={{ backgroundColor: '#333', color: '#fff', padding: '20px' }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Resultados de los Partidos
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ backgroundColor: '#333', minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Equipo A</TableCell>
                                    <TableCell>Equipo B</TableCell>
                                    <TableCell>Equipo Ganador</TableCell>
                                    <TableCell>Resultado</TableCell>
                                    <TableCell>Acción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <Typography variant="body1">Cargando resultados...</Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    matches.map((match, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{ color: '#fff' }}>{match.teamA}</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>{match.teamB}</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>{match.teamWinning}</TableCell>
                                            <TableCell sx={{ color: '#fff' }}>{match.result}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="info"
                                                    component={Link}
                                                    to={AppRoutesConstants.MATCH_DETAIL}
                                                >
                                                    Detalle
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
}
