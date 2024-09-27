import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { KnutIconTable } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/knuts/KnutIconTable';
import { SicklesIconTable } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/sickles/SicklesIconTable';
import { GalleonIconTable } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/galleons/GalleonIconTable';
import { blueGrey } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';

interface RechargeFormProps {
    amount: string;
    handleSubmit: (e: React.FormEvent) => void;
    selectedCurrency: string;
    setAmount: (value: string) => void;
    setSelectedCurrency: (value: string) => void;
}

export const RechargeForm: React.FC<RechargeFormProps> = ({
    amount,
    handleSubmit,
    selectedCurrency,
    setAmount,
    setSelectedCurrency,
}) => (
    <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <ThemeProvider theme={theme}>
                <FormControl fullWidth>
                    <InputLabel id="currency-label">Seleccionar moneda</InputLabel>
                    <Select
                        labelId="currency-label"
                        value={selectedCurrency}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        label="Seleccionar moneda"
                    >
                        <MenuItem value="galleons">
                            <GalleonIconTable /> Galleons
                        </MenuItem>
                        <MenuItem value="sickles">
                            <SicklesIconTable /> Sickles
                        </MenuItem>
                        <MenuItem value="knuts">
                            <KnutIconTable /> Knuts
                        </MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    type="number"
                    label={`${selectedCurrency.charAt(0).toUpperCase() + selectedCurrency.slice(1)}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    fullWidth
                    inputProps={{ min: 0, step: 1 }}
                />
            </ThemeProvider>
            <Button
                sx={{ ':hover': { backgroundColor: blueGrey[400] }, backgroundColor: blueGrey[700] }}
                type="submit"
                variant="contained"
                fullWidth
            >
                Recargar
            </Button>
        </Box>
    </form>
);
