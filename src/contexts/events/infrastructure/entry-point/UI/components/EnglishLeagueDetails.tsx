import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function EnglishLeagueDetails() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                backgroundColor: '#1c1613',
                color: '#fff',
                minHeight: '100vh',
                padding: '20px',
                textAlign: 'center',
            }}
        >
            <Container sx={{ padding: '20px' }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={8}>
                        <Card
                            sx={{
                                backgroundColor: '#333',
                                borderRadius: '10px',
                                boxShadow: 3,
                                color: '#fff',
                                padding: '20px',
                            }}
                        >
                            <CardMedia
                                component="img"
                                image="/images/EnglishDetails.jpeg"
                                alt="Liga Inglesa de Quidditch"
                                sx={{ borderRadius: '10px', marginBottom: '20px' }}
                            />
                            <CardContent>
                                <Typography variant="h3" gutterBottom>
                                    Liga Inglesa de Quidditch 2024
                                </Typography>
                                <Typography variant="h6" sx={{ marginTop: 2 }}>
                                    Fecha de inicio: 15 de Enero de 2024
                                </Typography>
                                <Typography variant="h6" sx={{ marginTop: 2 }}>
                                    Fecha de finalización: 25 de Noviembre de 2025
                                </Typography>
                                <Typography variant="body1" sx={{ marginTop: 2 }}>
                                    La Liga Inglesa de Quidditch 2024 promete ser una temporada emocionante y llena de
                                    acción, donde los mejores equipos de quidditch del Reino Unido competirán por el
                                    prestigioso título de campeones. Este deporte mixto y de contacto completo.
                                </Typography>

                                <Box sx={{ marginTop: '20px' }}>
                                    <Button variant="contained" color="info" onClick={() => navigate(-1)}>
                                        Volver a Eventos
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default EnglishLeagueDetails;
