import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './Home.css';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';
import { AppRoutesConstants } from '../../../../domain/model/constants/AppRoutes.Constants';

// Definimos el tipo para los datos de los partidos
interface MatchData {
    A: '';
    B: '';
    empate: '';
    imageA: '';
    imageB: '';
    matchId: '';
    teamA: '';
    teamB: '';
}

export function Home() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<SessionData | undefined>(undefined);
    const [matches, setMatches] = useState<MatchData[]>([]);

    // Cargar los datos de los partidos desde el archivo JSON
    useEffect(() => {
        fetch('/matches.json')
            .then((response) => response.json())
            .then((data) => setMatches(data))
            .catch((error) => console.error('Error al cargar los datos de los partidos:', error));
    }, []);

    // Gestionar la sesión
    useEffect(() => {
        const subscription = SessionManageUseCase.subjectOfSessionData.subscribe({
            next: setLoginData,
        });
        return () => subscription.unsubscribe();
    }, [navigate]);

    return (
        <main className="main-section">
            {!loginData && (
                <section className="dashboard">
                    <div className="scheme">
                        <h2>Bienvenido al Centro de Apuestas Quidditch</h2>
                        <p>La emoción del Quidditch en tus manos. ¿Listo para apostar?</p>
                        <div>
                            <Link to={AppRoutesConstants.LOGIN_PAGE}>
                                <input type="button" value="Iniciar sesión" />
                            </Link>
                            <Link to={AppRoutesConstants.SIGNUP_PAGE}>
                                <input type="button" value="Regístrate" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <h2>Partidos del Día</h2>
            <section className="dashboard-matches">
                {matches.length > 0 ? (
                    matches.map((match, index) => (
                        <div className="scheme" key={index}>
                            <h3>
                                {match.teamA} vs. {match.teamB}
                            </h3>
                            <img src={match.imageA} alt={match.imageA} />
                            <img src={match.imageB} alt={match.imageB} />
                            <div className="buttons-container">
                                <button
                                    className="ApostarButton"
                                    onClick={() => alert(`Equipo ${match.teamA} seleccionado`)}
                                >
                                    {match.teamA}: {match.A}
                                </button>

                                <button className="ApostarButton" onClick={() => alert('Empate seleccionado')}>
                                    Empate: {match.empate}
                                </button>

                                <button
                                    className="ApostarButton"
                                    onClick={() => alert(`Equipo ${match.teamB} seleccionado`)}
                                >
                                    {match.teamB}: {match.B}
                                </button>

                                <Link to={`/match/${match.matchId}`}>
                                    <input type="button" value="Detalle" />
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Cargando partidos...</p>
                )}
            </section>
        </main>
    );
}
