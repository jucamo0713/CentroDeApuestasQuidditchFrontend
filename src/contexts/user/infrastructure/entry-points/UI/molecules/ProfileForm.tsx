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
    const [profile, setProfile] = useState<User>({
        email: '',
        fullName: '',
        username: '',
    });
    const [editableData, setEditableData] = useState<User>({ ...profile });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditableData({
            ...editableData,
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
                        label="Email"
                        type="email"
                        name="email"
                        value={editableData.email}
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
    } else {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ThemeProvider theme={theme}>
                    <TextField label="Nombre" name="fullName" value={profile.fullName} fullWidth disabled />
                    <TextField label="Email" type="email" name="email" value={profile.email} fullWidth disabled />
                    <TextField label="Usuario" name="username" value={profile.username} fullWidth disabled />
                </ThemeProvider>
                <Box sx={{ mt: 2 }}>
                    <Button
                        sx={{ ':hover': { backgroundColor: blueGrey[400] }, backgroundColor: blueGrey[700] }}
                        variant="contained"
                        onClick={() => setEdit(true)}
                    >
                        Editar
                    </Button>
                </Box>
            </Box>
        );
    }
}
