import React, { useEffect, useState } from 'react';
import {
    Typography,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
} from '@mui/material';
import { MatchData } from '../../../../domain/model/matchData';
import { MatchRow } from './MatchRow';
import './Results.css';

// Componente principal
export function Results() {
    const [matches, setMatches] = useState<MatchData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
                setLoading(false);
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
                                    matches.map((match, index) => <MatchRow key={index} match={match} />)
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
}
