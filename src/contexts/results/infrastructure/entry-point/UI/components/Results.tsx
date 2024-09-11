import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import './Results.css';

// Definimos el tipo para los datos de los partidos
interface MatchData {
    result: '';
    teamA: '';
    teamB: '';
    teamWinning: '';
}

//TODO
export function Results() {
    const [matches, setMatches] = useState<MatchData[]>([]);

    useEffect(() => {
        fetch('/results.json')
            .then((response) => response.json())
            .then((data) => setMatches(data))
            .catch((error) => console.error('Error al cargar los datos de los partidos:', error));
    }, []);

    return (
        <main className="main-section">
            <section className="dashboard">
                <div className="scheme">
                    <table className="matches-table">
                        <thead>
                            <tr>
                                <th>Equipo A</th>
                                <th>Equipo B</th>
                                <th>Equipo Ganador</th>
                                <th>Resultado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matches.length > 0 ? (
                                matches.map((match, index) => (
                                    <tr key={index}>
                                        <td data-label="Equipo A">{match.teamA}</td>
                                        <td data-label="Equipo B">{match.teamB}</td>
                                        <td data-label="Equipo Ganador">{match.teamWinning}</td>
                                        <td data-label="Resultado">{match.result}</td>
                                        <td data-label="Acción">
                                            <Link to={AppRoutesConstants.MATCH_DETAIL}>
                                                <input type="button" value="Detalle" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <p>Cargando resultados...</p>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
