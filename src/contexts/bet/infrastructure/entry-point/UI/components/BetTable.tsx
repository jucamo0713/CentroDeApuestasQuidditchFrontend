import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Bet } from '../../../../domain/model/Bet';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import Balance from '../../../../../money/infrastructure/entry-points/UI/molecule/Balance';

interface BetTableProps {
    bets: Bet[];
    limitPerPage: number;
    page: number;
}

const BetTable: React.FC<BetTableProps> = ({ bets, limitPerPage, page }) => {
    const navigate = useNavigate();

    return (
        <TableContainer component={Paper} sx={{ backgroundColor: '#333' }}>
            <Table sx={{ minWidth: 650 }} aria-label="Bet History Table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: '#fff' }}>#</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Valor</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Multiplicador</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Estado</TableCell>
                        <TableCell sx={{ color: '#fff' }}>Acción</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bets.map((bet, i) => {
                        const status = bet.finished ? (bet.won ? 'Ganada' : 'Perdida') : 'Pendiente';
                        return (
                            <TableRow key={i}>
                                <TableCell sx={{ color: '#fff' }}>{1 + i + (page - 1) * limitPerPage}</TableCell>
                                <TableCell sx={{ color: '#fff' }}>
                                    <Balance
                                        galleons={bet.value.galleons}
                                        knuts={bet.value.knuts}
                                        sickles={bet.value.sickles}
                                    />
                                </TableCell>
                                <TableCell sx={{ color: '#fff' }}>x{bet.profit}</TableCell>
                                <TableCell
                                    sx={{
                                        color: status === 'Ganada' ? 'green' : status === 'Perdida' ? 'red' : 'white',
                                    }}
                                >
                                    {status}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={() =>
                                            navigate(AppRoutesConstants.BET_DETAIL.replace(':betId', bet.betId))
                                        }
                                    >
                                        Detalle
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BetTable;
