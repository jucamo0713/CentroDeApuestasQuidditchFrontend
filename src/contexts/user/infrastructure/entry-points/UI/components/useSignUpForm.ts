import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import { LoadingSourceUseCase } from '../../../../../shared/domain/usecase/LoadingSource.UseCase';
import { loginUser } from '../services/authService';

export const useSignUpForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        confirmPassword: '',
        email: '',
        password: '',
        username: '',
    });

    const [errors, setErrors] = useState({
        confirmPassword: '',
        email: '',
        password: '',
        username: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors: typeof errors = {
            confirmPassword: '',
            email: '',
            password: '',
            username: '',
        };
        let isValid = true;

        if (formData.username.trim() === '') {
            newErrors.username = 'El nombre de usuario es requerido.';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Por favor, ingresa un correo electrónico válido.';
            isValid = false;
        }

        if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            LoadingSourceUseCase.setLoading();
            try {
                await loginUser(formData.email, formData.password);
                navigate(AppRoutesConstants.MAIN_PAGE);
            } finally {
                LoadingSourceUseCase.unsetLoading();
            }
        }
    };

    return {
        errors,
        formData,
        handleInputChange,
        handleSignUp,
    };
};
