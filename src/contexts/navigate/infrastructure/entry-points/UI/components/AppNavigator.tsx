import React, { useState } from 'react';
import logo from '../../../../../shared/domain/model/resources/logo.png';
import './AppNavigator.css';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import { SessionManageInstance } from '../../../../../auth/applications/dependencyInjection/SessionManageInstance';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { LoadingSourceUseCase } from '../../../../../shared/domain/usecase/LoadingSource.UseCase';

export default function AppNavigator() {
    const [loginData, setLoginData] = useState<SessionData | undefined>(undefined);
    SessionManageInstance.getSessionData().then((data) => {
        setLoginData(data[0]);
        data[1].subscribe({
            next: setLoginData,
        });
    });
    return (
        <header className="nav-bar">
            <section className="logo">
                <img src={logo} alt="logo" />
                <span>CAQ</span>
            </section>
            <nav className="menu">
                <ul>
                    <li>
                        <a href={AppRoutesConstants.MAIN_PAGE}>Inicio</a>
                    </li>
                    <li>
                        <a href={AppRoutesConstants.MATCHES_PAGE}>Partidos</a>
                    </li>
                    <li>
                        <a href={AppRoutesConstants.RESULTS_PAGE}>Resultados</a>
                    </li>
                    <li>
                        <a href={AppRoutesConstants.EVENTS_PAGE}>Eventos</a>
                    </li>
                    <li>
                        <a href={AppRoutesConstants.TEAMS_PAGE}>Equipos</a>
                    </li>
                    {loginData && (
                        <li>
                            <a href={AppRoutesConstants.FAVORITE}>Favoritos</a>
                        </li>
                    )}
                    {loginData && (
                        <li>
                            <a href={AppRoutesConstants.RECHARGE}>Recargar</a>
                        </li>
                    )}
                    {loginData && (
                        <li>
                            <a href={AppRoutesConstants.PROFILE}>Perfil</a>
                        </li>
                    )}
                </ul>
            </nav>
            {!loginData && (
                <section>
                    <form
                        className="login"
                        onSubmit={(e) => {
                            e.preventDefault();
                            LoadingSourceUseCase.setLoading();
                            const email = e.currentTarget.email;
                            const password = e.currentTarget.password;
                            if (email.value && password.value) {
                                SessionManageInstance.loginUser(email.value, password.value).finally(() =>
                                    LoadingSourceUseCase.unsetLoading(),
                                );
                            } else {
                                !email.value && (email.className = 'error-input');
                                !password.value && (password.className = 'error-input');
                                LoadingSourceUseCase.unsetLoading();
                            }
                        }}
                    >
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" placeholder="Correo" />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Contraseña" />
                        <input type="submit" className="magic-button" value="ENTRAR" />
                        <a href={AppRoutesConstants.RECOVER_ACCOUNT_PAGE}>¿Olvidaste tu Contraseña?</a>
                    </form>
                </section>
            )}
        </header>
    );
}
