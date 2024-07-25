import React, { useState } from 'react';
import logo from '../../../../../shared/domain/resources/logo.png';
import './AppNavigator.css';
import { AppRoutesConstants } from '../../../../../shared/domain/constants/AppRoutes.Constants';

export default function AppNavigator(data: { isLogged: boolean }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <header className="nav-bar">
            <section className="menu-toggle">
                <button onClick={toggleMenu}>&#9776;</button>
            </section>
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
                </ul>
            </nav>
            <section>
                {!data.isLogged && (
                    <form className="login">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" placeholder="Correo" />
                        <label htmlFor="pwd">Password</label>
                        <input type="password" id="pwd" name="pwd" placeholder="Contraseña" />
                        <button type="submit" className="magic-button">
                            ENTRAR
                        </button>
                        <a href={AppRoutesConstants.RECOVER_ACCOUNT_PAGE}>¿Olvidaste tu Contraseña?</a>
                    </form>
                )}
            </section>
        </header>
    );
}
