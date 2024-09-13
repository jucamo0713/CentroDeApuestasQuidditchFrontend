import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import { LoadingSourceUseCase } from '../../../../../shared/domain/usecase/LoadingSource.UseCase';
import { SessionManageInstance } from '../../../../../auth/applications/dependencyInjection/SessionManageInstance';
import './LoginPage.css';

export function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        LoadingSourceUseCase.setLoading();

        try {
            if (email && password) {
                await SessionManageInstance.loginUser(email, password);
                navigate(AppRoutesConstants.MAIN_PAGE); // Redirigir a la página principal tras el login
            } else {
                setError('Ambos campos son obligatorios');
            }
        } catch (e) {
            setError('Correo o contraseña incorrectos');
        } finally {
            LoadingSourceUseCase.unsetLoading();
        }
    };

    return (
        <main className="main-section">
            <section className="dashboard">
                <div className="scheme">
                    {error && <p className="error">{error}</p>}
                    <form className="form" onSubmit={handleLogin}>
                        <h2>Iniciar Sesión</h2>
                        <div className="input-text">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                placeholder="Correo electrónico"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                placeholder="Contraseña"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input type="submit" value="Entrar" />
                        </div>
                        <div>
                            <a href={AppRoutesConstants.RECOVER_ACCOUNT_PAGE}>¿Olvidaste tu contraseña?</a>
                        </div>
                    </form>
                    <br />
                </div>
            </section>
        </main>
    );
}
