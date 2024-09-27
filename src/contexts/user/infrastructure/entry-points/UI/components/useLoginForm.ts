import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import { LoadingSourceUseCase } from '../../../../../shared/domain/usecase/LoadingSource.UseCase';
import { SessionManageInstance } from '../../../../../auth/applications/dependencyInjection/SessionManageInstance';

export const useLoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const processID = LoadingSourceUseCase.addLoaderProcess();

        try {
            if (!email || !password) {
                setError('Ambos campos son obligatorios');
                return;
            }
            await SessionManageInstance.loginUser(email, password);
            navigate(AppRoutesConstants.MAIN_PAGE);
        } finally {
            LoadingSourceUseCase.removeLoaderProcess(processID);
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
