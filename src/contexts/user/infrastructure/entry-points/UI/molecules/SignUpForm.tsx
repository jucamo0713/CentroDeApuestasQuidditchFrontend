import React from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, Link as MuiLink } from '@mui/material';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import { useSignUpForm } from '../components/useSignUpForm';
import { blueGrey } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';

export function SignUpForm() {
    const { formData, errors, handleInputChange, handleSignUp } = useSignUpForm();

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
                        Registrarse
                    </Typography>
                    <form onSubmit={handleSignUp}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <ThemeProvider theme={theme}>
                                <TextField
                                    type="text"
                                    label="Nombre de usuario"
                                    variant="outlined"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                    error={!!errors.username}
                                    helperText={errors.username}
                                />
                                <TextField
                                    type="email"
                                    label="Correo electrónico"
                                    variant="outlined"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                                <TextField
                                    type="password"
                                    label="Contraseña"
                                    variant="outlined"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />
                                <TextField
                                    type="password"
                                    label="Confirmar contraseña"
                                    variant="outlined"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                />
                            </ThemeProvider>
                            <Button
                                sx={{ ':hover': { backgroundColor: blueGrey[400] }, backgroundColor: blueGrey[700] }}
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Registrarse
                            </Button>
                            <MuiLink
                                href={AppRoutesConstants.LOGIN_PAGE}
                                variant="body2"
                                sx={{ color: 'info', textAlign: 'center' }}
                            >
                                ¿Ya tienes una cuenta? Inicia sesión
                            </MuiLink>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}
