import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';

export function Events() {
    return (
        <Box
            sx={{ backgroundColor: '#1c1613', color: '#fff', minHeight: '100vh', padding: '20px', textAlign: 'center' }}
        >
            <Container sx={{ padding: '20px' }}>
                <Grid container spacing={3}>
                    {/* Sección Mundial de Quidditch */}
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#333', borderRadius: '10px', boxShadow: 3, color: '#fff' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/images/Mundial.jpeg"
                                alt="Mundial de Quidditch"
                            />
                            <CardContent>
                                <Typography variant="h4" gutterBottom>
                                    Mundial de Quidditch
                                </Typography>
                                <Box sx={{ marginTop: 2 }}>
                                    <Typography variant="h6">Información</Typography>
                                    <Typography variant="body1">Fechas...</Typography>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={() => {}}
                                        sx={{ marginTop: '10px' }}
                                    >
                                        Más información
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Sección Liga Inglesa */}
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#333', borderRadius: '10px', boxShadow: 3, color: '#fff' }}>
                            <CardMedia component="img" height="140" image="/images/League.jpeg" alt="Liga Inglesa" />
                            <CardContent>
                                <Typography variant="h4" gutterBottom>
                                    Liga Inglesa
                                </Typography>
                                <Box sx={{ marginTop: 2 }}>
                                    <Typography variant="h6">Información</Typography>
                                    <Typography variant="body1">Fechas...</Typography>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={() => {}}
                                        sx={{ marginTop: '10px' }}
                                    >
                                        Más información
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Sección Copa de Hogwarts */}
                    <Grid item xs={12} sm={4}>
                        <Card sx={{ backgroundColor: '#333', borderRadius: '10px', boxShadow: 3, color: '#fff' }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/images/Hogwarts_Cup.jpeg"
                                alt="Copa de Hogwarts"
                            />
                            <CardContent>
                                <Typography variant="h4" gutterBottom>
                                    Copa de Hogwarts
                                </Typography>
                                <Box sx={{ marginTop: 2 }}>
                                    <Typography variant="h6">Información</Typography>
                                    <Typography variant="body1">Fechas...</Typography>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={() => {}}
                                        sx={{ marginTop: '10px' }}
                                    >
                                        Más información
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

export default Events;
