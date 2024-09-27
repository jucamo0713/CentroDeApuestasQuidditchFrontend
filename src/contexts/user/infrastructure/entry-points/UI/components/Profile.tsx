import React, { useEffect, useState } from 'react';
import { SessionManageInstance } from '../../../../../auth/applications/dependencyInjection/SessionManageInstance';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { LoadingSourceUseCase } from '../../../../../shared/domain/usecase/LoadingSource.UseCase';
import { useNavigate } from 'react-router-dom';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';
import { BetHistory } from '../../../../../bet/infrastructure/entry-point/UI/components/BetHistory';
import { ProfileForm } from '../molecules/ProfileForm';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';

export default function Profile() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<SessionData | undefined>(undefined);

    useEffect(() => {
        const subscription = SessionManageUseCase.subjectOfSessionData.subscribe({
            next: (v) => {
                if (!v) {
                    navigate('/');
                }
                setLoginData(v);
            },
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    if (loginData) {
        return (
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        alignItems: 'center',
                        backgroundColor: '#1c1613',
                        color: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                        textAlign: 'center',
                    }}
                >
                    <Card sx={{ backgroundColor: '#333', color: '#fff', margin: '20px', maxWidth: 600, minWidth: 700 }}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                Mi perfil
                            </Typography>
                            <ProfileForm loginData={loginData} />
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <Button
                                    variant="contained"
                                    color="info"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        LoadingSourceUseCase.setLoading();
                                        SessionManageInstance.closeSession().finally(() => {
                                            LoadingSourceUseCase.unsetLoading();
                                            navigate('/');
                                        });
                                    }}
                                >
                                    Cerrar sesión
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                    <BetHistory loginData={loginData} />
                </Box>
            </ThemeProvider>
        );
    } else {
        return <>Unauthorized</>;
    }
}
