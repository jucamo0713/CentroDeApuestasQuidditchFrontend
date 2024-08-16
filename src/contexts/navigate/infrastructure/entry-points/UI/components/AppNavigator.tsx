import React, { useEffect, useRef, useState } from 'react';
import logo from '../../../../../shared/domain/model/resources/logo.png';
import './AppNavigator.css';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import { SessionManageInstance } from '../../../../../auth/applications/dependencyInjection/SessionManageInstance';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { LoadingSourceUseCase } from '../../../../../shared/domain/usecase/LoadingSource.UseCase';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';
import { MoneyManageUseCase } from '../../../../../money/domain/usecase/MoneyManage.UseCase';
import { Link } from 'react-router-dom';
import { MoneyData } from '../../../../../money/domain/model/MoneyData';
import { firstValueFrom, Subscription } from 'rxjs';
import { MoneyManageInstance } from '../../../../../money/applications/dependencyInjection/MoneyManageInstance';
import { GalleonIcon } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/galleons/GalleonIcon';
import { KnutIcon } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/knuts/KnutIcon';
import { SicklesIcon } from '../../../../../shared/infrastructure/entry-points/UI/atoms/coins/sickles/SicklesIcon';

export default function AppNavigator() {
    const [loginData, setLoginData] = useState<SessionData | undefined>(undefined);
    const [moneyData, setMoneyData] = useState<MoneyData | undefined>(undefined);
    const moneySubscription = useRef<Subscription | undefined>();
    useEffect(() => {
        SessionManageUseCase.subjectOfSessionData.subscribe({
            next: setLoginData,
        });
    }, []);

    useEffect(() => {
        if (loginData) {
            moneySubscription.current = MoneyManageUseCase.MoneyData$.subscribe({
                next: setMoneyData,
            });
            firstValueFrom(MoneyManageUseCase.MoneyData$).then(async (value) => {
                if (!value) {
                    await MoneyManageInstance.findMoneyData(loginData);
                }
            });
        } else if (moneySubscription.current) {
            moneySubscription.current.unsubscribe();
            moneySubscription.current = undefined;
            setMoneyData(undefined);
        }
    }, [loginData]);
    return (
        <header className="nav-bar">
            <section className="logo">
                <img src={logo} alt="logo" />
                <span>CAQ</span>
            </section>
            <nav className="menu">
                <ul>
                    <li>
                        <Link to={AppRoutesConstants.MAIN_PAGE}>Inicio</Link>
                    </li>
                    <li>
                        <Link to={AppRoutesConstants.MATCHES_PAGE}>Partidos</Link>
                    </li>
                    <li>
                        <Link to={AppRoutesConstants.RESULTS_PAGE}>Resultados</Link>
                    </li>
                    <li>
                        <Link to={AppRoutesConstants.EVENTS_PAGE}>Eventos</Link>
                    </li>
                    <li>
                        <Link to={AppRoutesConstants.TEAMS_PAGE}>Equipos</Link>
                    </li>
                    {loginData && (
                        <li>
                            <Link to={AppRoutesConstants.FAVORITE}>Favoritos</Link>
                        </li>
                    )}
                    {loginData && (
                        <li>
                            <Link to={AppRoutesConstants.RECHARGE}>Recargar</Link>
                        </li>
                    )}
                    {loginData && (
                        <li>
                            <Link to={AppRoutesConstants.PROFILE}>Perfil</Link>
                        </li>
                    )}
                </ul>
            </nav>

            <section>
                {loginData ? (
                    <>
                        Balance:{' '}
                        <div className="balance-container">
                            <GalleonIcon />
                            {moneyData?.galleons ?? 0} |&nbsp;
                            <SicklesIcon />
                            {moneyData?.sickles ?? 0} |&nbsp;
                            <KnutIcon />
                            {moneyData?.knuts ?? 0}
                        </div>
                    </>
                ) : (
                    <form
                        className="login"
                        onSubmit={(e) => {
                            e.preventDefault();
                            LoadingSourceUseCase.setLoading();
                            const email = e.currentTarget.email;
                            const password = e.currentTarget.password;
                            if (email.value && password.value) {
                                SessionManageInstance.loginUser(email.value, password.value).finally(() => {
                                    LoadingSourceUseCase.unsetLoading();
                                });
                            } else {
                                !email.value && (email.className = 'error-input');
                                !password.value && (password.className = 'error-input');
                                LoadingSourceUseCase.unsetLoading();
                            }
                        }}
                    >
                        <label htmlFor="email">Correo: </label>
                        <input type="text" id="email" name="email" />
                        <label htmlFor="password">Password: </label>
                        <input type="password" id="password" name="password" />
                        <input type="submit" className="magic-button" value="ENTRAR" />
                        <a href={AppRoutesConstants.RECOVER_ACCOUNT_PAGE}>¿Olvidaste tu Contraseña?</a>
                    </form>
                )}
            </section>
        </header>
    );
}
