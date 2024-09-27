import React, { useEffect, useState } from 'react';
import { Box, Card, Typography } from '@mui/material';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { PaginatedModel } from '../../../../../shared/domain/model/PaginatedModel';
import { Bet } from '../../../../domain/model/Bet';
import { BetUseCaseInstance } from '../../../../application/dependencyInjection/BetUseCaseInstance';
import BetTable from './BetTable';
import { PaginationSelector } from '../../../../../shared/infrastructure/entry-points/UI/atoms/pagination/PaginationSelector';
import './BetHistory.css';

const LIMIT_PER_PAGE = 5;

export function BetHistory({ loginData }: { loginData: SessionData }) {
    const [page, setPage] = useState(1);
    const [bets, setBets] = useState<PaginatedModel<Bet>>({
        data: [],
        metadata: { limit: 0, page, total: 0, totalPages: 0 },
    });

    useEffect(() => {
        BetUseCaseInstance.getBetsPaginated(page, LIMIT_PER_PAGE, loginData).then((v) => setBets(v));
    }, [page, loginData]);

    return (
        <Box
            sx={{
                backgroundColor: '#1c1613',
                color: '#fff',
                margin: '20px',
                minHeight: '100vh',
                padding: '20px',
                textAlign: 'center',
            }}
        >
            <Card sx={{ backgroundColor: '#333', color: '#fff', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Historial de Apuestas
                </Typography>

                <BetTable bets={bets.data} page={page} limitPerPage={LIMIT_PER_PAGE} />

                <PaginationSelector totalPages={bets.metadata.totalPages} currentPage={page} pageSetter={setPage} />
            </Card>
        </Box>
    );
}
