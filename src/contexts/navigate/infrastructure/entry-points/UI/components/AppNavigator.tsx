import React, { useEffect, useRef, useState } from 'react';
import logo from '../../../../../shared/domain/model/resources/logo.png';
import './AppNavigator.css';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
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

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

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

            <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                <span></span>
            </button>

            <nav className={`menu ${isMenuOpen ? 'active' : ''}`}>
                <ul>
                    <li>
                        <Link to={AppRoutesConstants.MAIN_PAGE} onClick={toggleMenu}>
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link to={AppRoutesConstants.MATCHES_PAGE} onClick={toggleMenu}>
                            Partidos
                        </Link>
                    </li>
                    <li>
                        <Link to={AppRoutesConstants.RESULTS_PAGE} onClick={toggleMenu}>
                            Resultados
                        </Link>
                    </li>
                    <li>
                        <Link to={AppRoutesConstants.EVENTS_PAGE} onClick={toggleMenu}>
                            Eventos
                        </Link>
                    </li>
                    <li>
                        <Link to={AppRoutesConstants.TEAMS_PAGE} onClick={toggleMenu}>
                            Equipos
                        </Link>
                    </li>
                    {loginData && (
                        <>
                            <li>
                                <Link to={AppRoutesConstants.FAVORITE} onClick={toggleMenu}>
                                    Favoritos
                                </Link>
                            </li>
                            <li>
                                <Link to={AppRoutesConstants.RECHARGE} onClick={toggleMenu}>
                                    Recargar
                                </Link>
                            </li>
                            <li>
                                <Link to={AppRoutesConstants.PROFILE} onClick={toggleMenu}>
                                    Perfil
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <section>
                {loginData && (
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
                )}
            </section>
        </header>
    );
}
