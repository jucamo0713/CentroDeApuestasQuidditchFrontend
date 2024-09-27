import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Team } from '../types/types';
import { SessionData } from '../../../../../auth/domain/model/SessionData';

interface TeamCardProps {
    addToFavorites: (teamName: string) => void;
    team: Team;
    loginData?: SessionData;
}

const TeamCard: React.FC<TeamCardProps> = ({ addToFavorites, loginData, team }) => {
    return (
        <Card sx={{ backgroundColor: '#333', color: '#fff', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia component="img" height="140" image={team.image} alt={team.name} />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5">{team.name}</Typography>
                <Typography variant="body2">{team.description}</Typography>
                {loginData && (
                    <Button
                        variant="contained"
                        color="info"
                        sx={{ marginTop: '10px' }}
                        onClick={() => addToFavorites(team.name)}
                    >
                        Agregar a Favoritos
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default TeamCard;
