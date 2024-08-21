import { Link } from 'react-router-dom';
import React from 'react';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';

//TODO
export function Matches() {
    return (
        <main className="main-section">
            <section id="dashboard">
                <div className="scheme">
                    <h3>Equipo A vs. Equipo B</h3>
                    <p>Estadísticas Previas, Cuotas de Apuestas, etc.</p>
                    <br />
                    <Link to={AppRoutesConstants.MATCH_DETAIL}>
                        <input type="button" value="Detalle" />
                    </Link>
                </div>
            </section>
            <section id="dashboard">
                <div className="scheme">
                    <h3>Equipo C vs. Equipo D</h3>
                    <p>Estadísticas Previas, Cuotas de Apuestas, etc.</p>
                    <br />
                    <Link to={AppRoutesConstants.MATCH_DETAIL}>
                        <input type="button" value="Detalle" />
                    </Link>
                </div>
            </section>
            <section id="dashboard">
                <div className="scheme">
                    <h3>Equipo R vs. Equipo E</h3>
                    <p>Estadísticas Previas, Cuotas de Apuestas, etc.</p>
                    <br />
                    <Link to={AppRoutesConstants.MATCH_DETAIL}>
                        <input type="button" value="Detalle" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
