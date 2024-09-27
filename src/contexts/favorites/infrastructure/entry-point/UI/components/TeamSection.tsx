import React from 'react';
import { Grid, Typography } from '@mui/material';
import TeamCard from '../molecules/TeamCard';
import { Team } from '../types/types';
import { SessionData } from '../../../../../auth/domain/model/SessionData';

interface TeamSectionProps {
    teams: Team[];
    title: string;
    loginData?: SessionData;
}

const TeamSection: React.FC<TeamSectionProps> = ({ loginData, teams, title }) => {
    const removeToFavorites = (teamName: string) => {
        console.log(`Retirar ${teamName} de favoritos`);
        // Aquí deberías añadir la lógica para eliminar un equipo de los favoritos
    };

    return (
        <section>
            <Typography
                variant="h2"
                gutterBottom
                sx={{
                    fontSize: { lg: '3rem', md: '2.5rem', sm: '2rem', xs: '1.5rem' },
                    marginBottom: '20px',
                }}
            >
                {title}
            </Typography>
            <Grid container spacing={3}>
                {teams.length > 0 ? (
                    teams.map((team, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <TeamCard team={team} loginData={loginData} removeToFavorites={removeToFavorites} />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1">No se encontraron equipos en esta categoría.</Typography>
                )}
            </Grid>
        </section>
    );
};

export default TeamSection;
