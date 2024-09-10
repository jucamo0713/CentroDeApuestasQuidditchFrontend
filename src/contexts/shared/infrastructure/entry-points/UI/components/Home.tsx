import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './Home.css';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';
import { AppRoutesConstants } from '../../../../domain/model/constants/AppRoutes.Constants';

//TODO
export function Home() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<SessionData | undefined>(undefined);
    useEffect(() => {
        SessionManageUseCase.subjectOfSessionData.subscribe({
            next: setLoginData,
        });
    }, [navigate]);
    return (
        <main className="main-section">
            {!loginData && (
                <section className="dashboard">
                    <div className="scheme">
                        <h2>Bienvenido al Centro de Apuestas Quidditch</h2>
                        <p>La emoción del Quidditch en tus manos. ¿Listo para apostar?</p>
                        <Link to={AppRoutesConstants.LOGIN_PAGE}>
                            <input type="button" value="Iniciar sesión" />
                        </Link>
                        <Link to={AppRoutesConstants.SIGNUP}>
                            <input type="button" value="Regístrate" />
                        </Link>
                    </div>
                </section>
            )}

            <h2>Partidos del Día</h2>
            <section className="dashboard">
                <div className="scheme">
                    <h3>Equipo A vs. Equipo B</h3>
                    <p>Estadísticas, Horario, Cuotas de Apuestas, etc.</p>
                    <br />
                    <Link to={AppRoutesConstants.MATCH_DETAIL}>
                        <input type="button" value="Detalle" />
                    </Link>
                </div>
            </section>

            <section className="dashboard">
                <div className="scheme">
                    <h3>Equipo G vs. Equipo H</h3>
                    <p>Estadísticas, Horario, Cuotas de Apuestas, etc.</p>
                    <br />
                    <Link to={AppRoutesConstants.MATCH_DETAIL}>
                        <input type="button" value="Detalle" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
