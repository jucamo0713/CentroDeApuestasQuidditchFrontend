import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import { LoadingSourceUseCase } from '../../../../../shared/domain/usecase/LoadingSource.UseCase';
import { UserUseCaseInstance } from '../../../../application/dependencyInjection/UserUseCaseInstance';
import { toast } from 'react-toastify';
import { SessionManageInstance } from '../../../../../auth/applications/dependencyInjection/SessionManageInstance';

export const useSignUpForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        confirmPassword: '',
        email: '',
        name: '',
        password: '',
        username: '',
    });

    const [errors, setErrors] = useState({
        confirmPassword: '',
        email: '',
        name: '',
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
            name: '',
            password: '',
            username: '',
        };
        let isValid = true;

        if (formData.name.trim() === '') {
            newErrors.name = 'El nombre es requerido.';
            isValid = false;
        }

        if (formData.username.trim() === '') {
            newErrors.username = 'El nombre de usuario es requerido.';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Por favor, ingresa un correo electrónico válido.';
            isValid = false;
        }
        const passwordRegex = /^(?=.*\d)(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[^\p{L}\d])\S{8,}$/u;
        if (!passwordRegex.test(formData.password)) {
            newErrors.password =
                'La contraseña debe ser de almenos 8 caracteres, almenos una minuscula, una mayuscula, un numero, y un caracter especial.';
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
            const processId = LoadingSourceUseCase.addLoaderProcess();
            try {
                const response = await UserUseCaseInstance.signupUser(
                    formData.email,
                    formData.password,
                    formData.name,
                    formData.username,
                );
                if (response) {
                    await SessionManageInstance.saveSessionData(response);
                    toast.success('Usuario registrado exitosamente');
                    navigate(AppRoutesConstants.MAIN_PAGE);
                }
            } finally {
                LoadingSourceUseCase.removeLoaderProcess(processId);
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
