import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';
import './Matches.css';

// Definimos el tipo para los datos de los partidos
interface MatchData {
    A: '';
    B: '';
    empate: '';
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
            {matches.map((match, index) => (
                <section id="dashboard" key={index}>
                    <div className="scheme">
                        <h3>
                            {match.teamA} vs. {match.teamB}
                        </h3>
                        <button className="ApostarButton" onClick={() => alert(`Equipo ${match.teamA} seleccionado`)}>
                            {match.teamA}: {match.A}
                        </button>

                        <button className="ApostarButton" onClick={() => alert('Empate seleccionado')}>
                            Empate: {match.empate}
                        </button>

                        <button className="ApostarButton" onClick={() => alert(`Equipo ${match.teamB} seleccionado`)}>
                            {match.teamB}: {match.B}
                        </button>

                        <br />
                        <Link to={AppRoutesConstants.MATCH_DETAIL}>
                            <input type="button" value="Detalle" />
                        </Link>
                    </div>
                </section>
            ))}
        </main>
    );
}
