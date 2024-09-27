import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';
import TeamSection from './TeamSection';
import { TeamsData } from '../types/types';

export function Favorites() {
    const [loginData, setLoginData] = useState<SessionData | undefined>(undefined);
    const [teamsData, setTeamsData] = useState<TeamsData | null>(null);

    useEffect(() => {
        // TODO: Cargar los favoritos del usuario que ha iniciado sesión
        fetch('/teams.json')
            .then((response) => response.json())
            .then((data) => setTeamsData(data))
            .catch((error) => console.error('Error al cargar los datos de los equipos:', error));
    }, []);

    useEffect(() => {
        const subscription = SessionManageUseCase.subjectOfSessionData.subscribe({
            next: setLoginData,
        });
        return () => subscription.unsubscribe();
    }, []);

    if (!teamsData) return <Typography>Cargando equipos...</Typography>;

    return (
        <Box
            sx={{ backgroundColor: '#1c1613', color: '#fff', minHeight: '100vh', padding: '20px', textAlign: 'center' }}
        >
            {/* Sección para equipos de Gran Bretaña e Irlanda */}
            <TeamSection
                title="Equipos de Gran Bretaña e Irlanda"
                teams={teamsData.britain_ireland}
                loginData={loginData}
            />

            {/* Sección para equipos de Hogwarts */}
            <TeamSection title="Equipos de Hogwarts" teams={teamsData.hogwarts} loginData={loginData} />

            {/* Sección para equipos del mundo */}
            <TeamSection title="Equipos del mundo" teams={teamsData.world} loginData={loginData} />
        </Box>
    );
}

export default Favorites;
