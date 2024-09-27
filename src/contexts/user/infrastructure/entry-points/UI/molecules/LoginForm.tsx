import React from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, Link as MuiLink } from '@mui/material';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import { blueGrey } from '@mui/material/colors';
import { useLoginForm } from '../components/useLoginForm';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';

export function LoginForm() {
    const { email, setEmail, password, setPassword, error, handleLogin } = useLoginForm();

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
                        Iniciar Sesión
                    </Typography>
                    {error && (
                        <Typography variant="body2" color="error">
                            {error}
                        </Typography>
                    )}
                    <form onSubmit={handleLogin}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                    type="email"
                                    label="Correo electrónico"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    type="password"
                                    label="Contraseña"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </ThemeProvider>
                            <Button
                                sx={{ ':hover': { backgroundColor: blueGrey[400] }, backgroundColor: blueGrey[700] }}
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Entrar
                            </Button>
                            <MuiLink
                                href={AppRoutesConstants.RECOVER_ACCOUNT_PAGE}
                                variant="body2"
                                sx={{ color: 'info', textAlign: 'center' }}
                            >
                                ¿Olvidaste tu contraseña?
                            </MuiLink>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}
