import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { RechargeForm } from './RechargeForm';
import { RechargeIcons } from './RechargeIcons';
import useRecharge from './useRecharge';

export default function Recharge() {
    const { loginData, handleSubmit, selectedCurrency, setSelectedCurrency, amount, setAmount } = useRecharge();

    if (!loginData) {
        return <>Unauthorized</>;
    }

    return (
        <Box
            sx={{
                alignItems: 'center',
                backgroundColor: '#1c1613',
                color: '#fff',
                display: 'flex',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
            }}
        >
            <Card sx={{ backgroundColor: '#333', color: '#fff', maxWidth: 600, minWidth: 400, padding: '20px' }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Recargar
                    </Typography>
                    <RechargeIcons />
                    <RechargeForm
                        handleSubmit={handleSubmit}
                        selectedCurrency={selectedCurrency}
                        setSelectedCurrency={setSelectedCurrency}
                        amount={amount}
                        setAmount={setAmount}
                    />
                </CardContent>
            </Card>
        </Box>
    );
}
