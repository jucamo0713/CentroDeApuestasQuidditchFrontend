import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
//import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import './Matches.css';

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

export function Matches() {
    const [matches, setMatches] = useState<MatchData[]>([]);

    useEffect(() => {
        // Cargar el archivo JSON
        fetch('/matches.json') // Ajusta el path dependiendo de donde tengas tu archivo
            .then((response) => response.json())
            .then((data) => setMatches(data))
            .catch((error) => console.error('Error al cargar los datos de los partidos:', error));
    }, []);

    return (
        <main className="main-section">
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
