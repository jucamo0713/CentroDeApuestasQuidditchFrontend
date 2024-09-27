import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import { LoadingSourceUseCase } from '../../../../../shared/domain/usecase/LoadingSource.UseCase';
import { loginUser } from '../services/authService';

interface HttpError extends Error {
    response?: {
        status: number;
    };
}

export const useLoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        LoadingSourceUseCase.setLoading();

        try {
            if (!email || !password) {
                setError('Ambos campos son obligatorios');
                return;
            }

            await loginUser(email, password);
            navigate(AppRoutesConstants.MAIN_PAGE);
        } catch (err: unknown) {
            const httpError = err as HttpError;

            if (httpError.response && httpError.response.status === 401) {
                setError('Correo o contraseña incorrectos');
            } else {
                setError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.');
            }
        } finally {
            LoadingSourceUseCase.unsetLoading();
        }
    };

    return {
        email,
        error,
        handleLogin,
        password,
        setEmail,
        setPassword,
    };
};
