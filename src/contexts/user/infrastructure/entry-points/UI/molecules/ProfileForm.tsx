import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { useEffect, useState } from 'react';
import { UserUseCaseInstance } from '../../../../application/dependencyInjection/UserUseCaseInstance';
import { User } from '../../../../domain/model/User';
import { LoadingSourceUseCase } from '../../../../../shared/domain/usecase/LoadingSource.UseCase';
import { blueGrey } from '@mui/material/colors';
import { Box, Button, TextField } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';

export function ProfileForm({ loginData }: { loginData: SessionData }) {
    const [edit, setEdit] = useState(false);
    const [change, setChange] = useState(false);

    const [profile, setProfile] = useState<User>({
        email: '',
        fullName: '',
        password: '',
        username: '',
    });

    const [editableData, setEditableData] = useState<User>({ ...profile });
    const [changePassword, setChangePassword] = useState({ confirmPassword: '', password: '' });
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditableData({
            ...editableData,
            [name]: value,
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setChangePassword({
            ...changePassword,
            [name]: value,
        });
    };

    useEffect(() => {
        UserUseCaseInstance.getUser(loginData).then((user) => {
            setProfile(user);
            setEditableData({ ...user });
        });
    }, [loginData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        LoadingSourceUseCase.setLoading();

        if (editableData.email && editableData.username && editableData.fullName) {
            UserUseCaseInstance.updateUser(editableData.email, editableData.username, editableData.fullName, loginData)
                .then((updatedUser) => {
                    setProfile(updatedUser);
                })
                .finally(() => {
                    setEdit(false);
                    LoadingSourceUseCase.unsetLoading();
                });
        } else {
            LoadingSourceUseCase.unsetLoading();
        }
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        LoadingSourceUseCase.setLoading();

        if (changePassword.password !== changePassword.confirmPassword) {
            setPasswordError('Las contraseñas no coinciden');
            LoadingSourceUseCase.unsetLoading();
            return;
        }

        if (changePassword.password) {
            UserUseCaseInstance.updatePassword(changePassword.password, loginData)
                .then(() => {
                    setChangePassword({ confirmPassword: '', password: '' });
                })
                .finally(() => {
                    setChange(false);
                    LoadingSourceUseCase.unsetLoading();
                });
        } else {
            setPasswordError('Por favor ingresa una contraseña');
            LoadingSourceUseCase.unsetLoading();
        }
    };

    if (edit) {
        return (
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ThemeProvider theme={theme}>
                    <TextField
                        label="Nombre"
                        name="fullName"
                        value={editableData.fullName}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Usuario"
                        name="username"
                        value={editableData.username}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={editableData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </ThemeProvider>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                        sx={{ ':hover': { backgroundColor: blueGrey[400] }, backgroundColor: blueGrey[700] }}
                        variant="contained"
                        onClick={() => {
                            setEdit(false);
                            setEditableData(profile);
                        }}
                    >
                        Descartar Cambios
                    </Button>
                    <Button
                        sx={{ ':hover': { backgroundColor: blueGrey[400] }, backgroundColor: blueGrey[700] }}
                        type="submit"
                        variant="contained"
                    >
                        Guardar Cambios
                    </Button>
                </Box>
            </Box>
        );
    } else if (change) {
        return (
            <Box
                component="form"
                onSubmit={handlePasswordSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <ThemeProvider theme={theme}>
                    <TextField
                        label="Contraseña"
                        type="password"
                        name="password"
                        value={changePassword.password}
                        onChange={handlePasswordChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Confirmar contraseña"
                        type="password"
                        name="confirmPassword"
                        value={changePassword.confirmPassword}
                        onChange={handlePasswordChange}
                        fullWidth
                        required
                    />
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </ThemeProvider>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                        sx={{ ':hover': { backgroundColor: blueGrey[400] }, backgroundColor: blueGrey[700] }}
                        variant="contained"
                        onClick={() => {
                            setChange(false);
                            setChangePassword({ confirmPassword: '', password: '' });
                        }}
                    >
                        Descartar Cambios
                    </Button>
                    <Button
                        sx={{ ':hover': { backgroundColor: blueGrey[400] }, backgroundColor: blueGrey[700] }}
                        type="submit"
                        variant="contained"
                    >
                        Guardar Cambios
                    </Button>
                </Box>
            </Box>
        );
    } else {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ThemeProvider theme={theme}>
                    <TextField label="Nombre" name="fullName" value={profile.fullName} fullWidth disabled />
                    <TextField label="Usuario" name="username" value={profile.username} fullWidth disabled />
                    <TextField label="Email" type="email" name="email" value={profile.email} fullWidth disabled />
                </ThemeProvider>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button
                        sx={{ ':hover': { backgroundColor: blueGrey[400] }, backgroundColor: blueGrey[700] }}
                        variant="contained"
                        onClick={() => setEdit(true)}
                    >
                        Editar
                    </Button>
                    <Button
                        sx={{ ':hover': { backgroundColor: blueGrey[400] }, backgroundColor: blueGrey[700] }}
                        variant="contained"
                        onClick={() => setChange(true)}
                    >
                        Cambiar contraseña
                    </Button>
                </Box>
            </Box>
        );
    }
}
