import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function HogwartsCupDetails() {
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
                                image="/images/HogwartsDetails.jpeg"
                                alt="Copa Hogwarts de Quidditch"
                                sx={{ borderRadius: '10px', marginBottom: '20px' }}
                            />
                            <CardContent>
                                <Typography variant="h3" gutterBottom>
                                    Copa de Hogwarts 2024
                                </Typography>
                                <Typography variant="h6" sx={{ marginTop: 2 }}>
                                    Fecha de inicio: 20 de Julio de 2024
                                </Typography>
                                <Typography variant="h6" sx={{ marginTop: 2 }}>
                                    Fecha de finalización: 25 de Diciembre de 2024
                                </Typography>
                                <Typography variant="body1" sx={{ marginTop: 2 }}>
                                    La Copa Hogwarts de Quidditch es el evento más esperado del año en el mundo mágico,
                                    donde los cuatro equipos de las casas de Hogwarts: Gryffindor, Hufflepuff, Ravenclaw
                                    y Slytherin, compiten ferozmente por el honor y la gloria. Este torneo anual no solo
                                    pone a prueba las habilidades de vuelo y estrategia de los jugadores, sino también
                                    su valentía, trabajo en equipo y espíritu deportivo.
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

export default HogwartsCupDetails;
