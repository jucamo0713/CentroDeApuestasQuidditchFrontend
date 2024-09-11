import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';
import './Favorites.css';

interface Team {
    description: '';
    image: '';
    name: '';
}

interface TeamsData {
    britain_ireland: Team[];
    hogwarts: Team[];
    world: Team[];
}

export function Favorites() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<SessionData | undefined>(undefined);
    const [teamsData, setTeamsData] = useState<TeamsData | null>(null);

    useEffect(() => {
        //TODO
        //Se deben cargar los favoritos del usuario que inicia sesión
        fetch('/teams.json')
            .then((response) => response.json())
            .then((data) => setTeamsData(data))
            .catch((error) => console.error('Error al cargar los datos de los partidos:', error));
    }, []);

    // Gestionar la sesión
    useEffect(() => {
        const subscription = SessionManageUseCase.subjectOfSessionData.subscribe({
            next: setLoginData,
        });
        return () => subscription.unsubscribe();
    }, [navigate]);
    const removeToFavorites = () => {};

    if (!teamsData) return <div>Cargando equipos...</div>;
    return (
        <main className="main-section">
            <h2>Equipos de Gran Bretaña e Irlanda</h2>
            <section className="dashboard-favorites">
                {teamsData.britain_ireland && teamsData.britain_ireland.length > 0 ? (
                    teamsData.britain_ireland.map((team, index) => (
                        <div className="scheme" key={index}>
                            <img src={team.image} alt={team.name} />
                            <h3>{team.name}</h3>
                            <p>{team.description}</p>
                            {loginData && (
                                <input type="button" value="Retirar de Favoritos" onClick={removeToFavorites} />
                            )}
                        </div>
                    ))
                ) : (
                    <p>No se encontraron equipos de Gran Bretaña e Irlanda.</p>
                )}
            </section>

            <h2>Equipos de Hogwarts</h2>
            <section className="dashboard-favorites">
                {teamsData.hogwarts && teamsData.hogwarts.length > 0 ? (
                    teamsData.hogwarts.map((team, index) => (
                        <div className="scheme" key={index}>
                            <img src={team.image} alt={team.name} />
                            <h3>{team.name}</h3>
                            <p>{team.description}</p>
                            {loginData && (
                                <input type="button" value="Retirar de Favoritos" onClick={removeToFavorites} />
                            )}
                        </div>
                    ))
                ) : (
                    <p>No se encontraron equipos de Hogwarts.</p>
                )}
            </section>

            <h2>Equipos del mundo</h2>
            <section className="dashboard-favorites">
                {teamsData.world && teamsData.world.length > 0 ? (
                    teamsData.world.map((team, index) => (
                        <div className="scheme" key={index}>
                            <img src={team.image} alt={team.name} />
                            <h3>{team.name}</h3>
                            <p>{team.description || 'Información pendiente'}</p>
                            {loginData && (
                                <input type="button" value="Retirar de Favoritos" onClick={removeToFavorites} />
                            )}
                        </div>
                    ))
                ) : (
                    <p>No se encontraron equipos del mundo.</p>
                )}
            </section>
        </main>
    );
}
