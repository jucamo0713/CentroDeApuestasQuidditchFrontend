import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import { LoadingSourceUseCase } from '../../../../../shared/domain/usecase/LoadingSource.UseCase';
import { SessionManageInstance } from '../../../../../auth/applications/dependencyInjection/SessionManageInstance';
import './SignUp.css';

export function SignUp() {
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
            // TODO
            // Enviar los datos al backend
            console.log('Datos enviados:', formData);

            LoadingSourceUseCase.setLoading();
            try {
                await SessionManageInstance.loginUser(formData.email, formData.password);
                navigate(AppRoutesConstants.MAIN_PAGE); // Redirigir a la página principal tras el login
            } finally {
                LoadingSourceUseCase.unsetLoading();
            }
        }
    };

    return (
        <main className="main-section">
            <section className="dashboard">
                <div className="scheme">
                    <h2>Registro de Usuario</h2>
                    <form onSubmit={handleSignUp}>
                        <label htmlFor="username">Nombre de Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        <br />
                        {errors.username && <span className="error-message">{errors.username}</span>}

                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <br />
                        {errors.email && <span className="error-message">{errors.email}</span>}

                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <br />
                        {errors.password && <span className="error-message">{errors.password}</span>}

                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                        <br />
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                        <br />
                        <input type="submit" value="Registrarse" />
                    </form>
                </div>
            </section>
        </main>
    );
}
