import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function WorldCupDetails() {
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
                                image="/images/MundialDetails.jpeg"
                                alt="Mundial de Quidditch"
                                sx={{ borderRadius: '10px', marginBottom: '20px' }}
                            />
                            <CardContent>
                                <Typography variant="h3" gutterBottom>
                                    Mundial de Quidditch 2024
                                </Typography>
                                <Typography variant="h6" sx={{ marginTop: 2 }}>
                                    Fecha de inicio: 15 de Julio de 2024
                                </Typography>
                                <Typography variant="h6" sx={{ marginTop: 2 }}>
                                    Fecha de finalización: 25 de Julio de 2024
                                </Typography>
                                <Typography variant="body1" sx={{ marginTop: 2 }}>
                                    El Mundial de Quidditch es uno de los eventos deportivos más importantes del mundo
                                    mágico, donde equipos de todo el mundo compiten por el trofeo más prestigioso. En
                                    esta edición, los mejores equipos de 16 países participarán en emocionantes partidos
                                    llenos de acción, velocidad y estrategia.
                                </Typography>

                                <Box sx={{ marginTop: '20px' }}>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={() => navigate(-1)} // Vuelve a la página anterior (Events)
                                    >
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

export default WorldCupDetails;
