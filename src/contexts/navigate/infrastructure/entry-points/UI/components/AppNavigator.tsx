import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box, Button } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import logo from '../../../../../shared/domain/model/resources/logo.png';
import React, { useEffect, useRef, useState } from 'react';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { LoadingSourceUseCase } from '../../../../../shared/domain/usecase/LoadingSource.UseCase';
import { SessionManageInstance } from '../../../../../auth/applications/dependencyInjection/SessionManageInstance';
import { MoneyManageUseCase } from '../../../../../money/domain/usecase/MoneyManage.UseCase';
import { MoneyData } from '../../../../../money/domain/model/MoneyData';
import { firstValueFrom, Subscription } from 'rxjs';
import { MoneyManageInstance } from '../../../../../money/applications/dependencyInjection/MoneyManageInstance';
import { GalleonIcon } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/galleons/GalleonIcon';
import { KnutIcon } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/knuts/KnutIcon';
import { SicklesIcon } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/sickles/SicklesIcon';
import { blueGrey } from '@mui/material/colors';

export default function AppNavigator() {
    const navigate = useNavigate();
    const [moneyData, setMoneyData] = useState<MoneyData | undefined>(undefined);
    const moneySubscription = useRef<Subscription | undefined>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loginData, setLoginData] = useState<SessionData | undefined>(undefined);
    const isMenuOpen = Boolean(anchorEl);

    useEffect(() => {
        const subscription = SessionManageUseCase.subjectOfSessionData.subscribe({
            next: (v) => {
                setLoginData(v || undefined);
            },
        });
        return () => subscription.unsubscribe();
    }, []);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (route: string) => {
        navigate(route);
        handleMenuClose();
    };

    const handleLogout = () => {
        const processId = LoadingSourceUseCase.addLoaderProcess();
        SessionManageInstance.closeSession().finally(() => {
            LoadingSourceUseCase.removeLoaderProcess(processId);
            navigate('/');
        });
    };

    useEffect(() => {
        if (loginData && (!moneySubscription.current || moneySubscription.current?.closed)) {
            moneySubscription.current = MoneyManageUseCase.MoneyData$.subscribe({
                next: setMoneyData,
            });
            firstValueFrom(MoneyManageUseCase.MoneyData$).then(async (value) => {
                if (!value) {
                    await MoneyManageInstance.findMoneyData();
                }
            });
        } else if (moneySubscription.current) {
            moneySubscription.current.unsubscribe();
            moneySubscription.current = undefined;
            setMoneyData(undefined);
        }
        return () => moneySubscription.current?.unsubscribe();
    }, [loginData]);

    return (
        <AppBar
            position="static"
            sx={{ backgroundColor: blueGrey[700], boxShadow: '0 1px 5px rgba(240, 240, 240, 0.25)' }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Logo */}
                <Box sx={{ alignItems: 'center', display: 'flex' }}>
                    <img src={logo} alt="Logo" style={{ aspectRatio: '91/41', height: '6vh' }} />
                    <Typography variant="h6" sx={{ color: 'var(--secondary-color)', marginLeft: '10px' }}>
                        CAQ
                    </Typography>
                </Box>

                {/* Menu para pantallas grandes */}
                <Box sx={{ display: { md: 'flex', xs: 'none' } }}>
                    <Button
                        sx={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}
                        onClick={() => handleNavigation(AppRoutesConstants.MAIN_PAGE)}
                    >
                        Inicio
                    </Button>
                    <Button
                        sx={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}
                        onClick={() => handleNavigation(AppRoutesConstants.MATCHES_PAGE)}
                    >
                        Partidos
                    </Button>
                    <Button
                        sx={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}
                        onClick={() => handleNavigation(AppRoutesConstants.RESULTS_PAGE)}
                    >
                        Resultados
                    </Button>
                    <Button
                        sx={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}
                        onClick={() => handleNavigation(AppRoutesConstants.EVENTS_PAGE)}
                    >
                        Eventos
                    </Button>
                    <Button
                        sx={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}
                        onClick={() => handleNavigation(AppRoutesConstants.TEAMS_PAGE)}
                    >
                        Equipos
                    </Button>

                    {/* Mostrar diferentes opciones si el usuario ha iniciado sesión */}
                    {loginData ? (
                        <>
                            <Button
                                sx={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}
                                onClick={() => handleNavigation(AppRoutesConstants.FAVORITE)}
                            >
                                Favoritos
                            </Button>
                            <Button
                                sx={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}
                                onClick={() => handleNavigation(AppRoutesConstants.RECHARGE)}
                            >
                                Recargar
                            </Button>
                            <Button
                                sx={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}
                                onClick={() => handleNavigation(AppRoutesConstants.PROFILE)}
                            >
                                Perfil
                            </Button>
                            <Button sx={{ color: 'var(--secondary-color)', fontWeight: 'bold' }} onClick={handleLogout}>
                                Cerrar sesión
                            </Button>
                            {/* Mostrar el balance de dinero */}
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    color: 'var(--secondary-color)',
                                    display: 'flex',
                                    marginRight: 2,
                                }}
                            >
                                <GalleonIcon /> {moneyData?.galleons ?? 0} |&nbsp;
                                <SicklesIcon /> {moneyData?.sickles ?? 0} |&nbsp;
                                <KnutIcon /> {moneyData?.knuts ?? 0}
                            </Box>
                        </>
                    ) : (
                        <>
                            <Button
                                sx={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}
                                onClick={() => handleNavigation(AppRoutesConstants.LOGIN_PAGE)}
                            >
                                Iniciar sesión
                            </Button>
                            <Button
                                sx={{ color: 'var(--secondary-color)', fontWeight: 'bold' }}
                                onClick={() => handleNavigation(AppRoutesConstants.SIGNUP_PAGE)}
                            >
                                Registrarse
                            </Button>
                        </>
                    )}
                </Box>

                {/* Menu hamburguesa para pantallas pequeñas */}
                <Box sx={{ display: { md: 'none', xs: 'flex' } }}>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        PaperProps={{
                            sx: { backgroundColor: '#1c1613', color: 'var(--secondary-color)' },
                        }}
                    >
                        <MenuItem onClick={() => handleNavigation(AppRoutesConstants.MAIN_PAGE)}>Inicio</MenuItem>
                        <MenuItem onClick={() => handleNavigation(AppRoutesConstants.MATCHES_PAGE)}>Partidos</MenuItem>
                        <MenuItem onClick={() => handleNavigation(AppRoutesConstants.RESULTS_PAGE)}>
                            Resultados
                        </MenuItem>
                        <MenuItem onClick={() => handleNavigation(AppRoutesConstants.EVENTS_PAGE)}>Eventos</MenuItem>
                        <MenuItem onClick={() => handleNavigation(AppRoutesConstants.TEAMS_PAGE)}>Equipos</MenuItem>

                        {/* Mostrar opciones de perfil o iniciar sesión dependiendo del estado de sesión */}
                        {loginData ? (
                            <>
                                <MenuItem onClick={() => handleNavigation(AppRoutesConstants.FAVORITE)}>
                                    Favoritos
                                </MenuItem>
                                <MenuItem onClick={() => handleNavigation(AppRoutesConstants.RECHARGE)}>
                                    Recargar
                                </MenuItem>
                                <MenuItem onClick={() => handleNavigation(AppRoutesConstants.PROFILE)}>Perfil</MenuItem>
                                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                                {/* Mostrar el balance en el menú de pantallas pequeñas */}
                                <MenuItem>
                                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                                        <GalleonIcon /> {moneyData?.galleons ?? 0} |&nbsp;
                                        <SicklesIcon /> {moneyData?.sickles ?? 0} |&nbsp;
                                        <KnutIcon /> {moneyData?.knuts ?? 0}
                                    </Box>
                                </MenuItem>
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={() => handleNavigation(AppRoutesConstants.LOGIN_PAGE)}>
                                    Iniciar sesión
                                </MenuItem>
                                <MenuItem onClick={() => handleNavigation(AppRoutesConstants.SIGNUP_PAGE)}>
                                    Registrarse
                                </MenuItem>
                            </>
                        )}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
