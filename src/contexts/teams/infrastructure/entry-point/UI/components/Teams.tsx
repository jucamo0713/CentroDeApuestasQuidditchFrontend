import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';
import './Teams.css';

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

export function Teams() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<SessionData | undefined>(undefined);
    const [teamsData, setTeamsData] = useState<TeamsData | null>(null);

    useEffect(() => {
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
    const addToFavorites = () => {};

    if (!teamsData) return <div>Cargando equipos...</div>;

    return (
        <main className="main-section">
            <h2>Equipos de Gran Bretaña e Irlanda</h2>
            <section className="dashboard-teams">
                {teamsData.britain_ireland && teamsData.britain_ireland.length > 0 ? (
                    teamsData.britain_ireland.map((team, index) => (
                        <div className="scheme" key={index}>
                            <img src={team.image} alt={team.name} />
                            <h3>{team.name}</h3>
                            <p>{team.description}</p>
                            {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                        </div>
                    ))
                ) : (
                    <p>No se encontraron equipos de Gran Bretaña e Irlanda.</p>
                )}
            </section>

            <h2>Equipos de Hogwarts</h2>
            <section className="dashboard-teams">
                {teamsData.hogwarts && teamsData.hogwarts.length > 0 ? (
                    teamsData.hogwarts.map((team, index) => (
                        <div className="scheme" key={index}>
                            <img src={team.image} alt={team.name} />
                            <h3>{team.name}</h3>
                            <p>{team.description}</p>
                            {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                        </div>
                    ))
                ) : (
                    <p>No se encontraron equipos de Hogwarts.</p>
                )}
            </section>

            <h2>Equipos del mundo</h2>
            <section className="dashboard-teams">
                {teamsData.world && teamsData.world.length > 0 ? (
                    teamsData.world.map((team, index) => (
                        <div className="scheme" key={index}>
                            <img src={team.image} alt={team.name} />
                            <h3>{team.name}</h3>
                            <p>{team.description || 'Información pendiente'}</p>
                            {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                        </div>
                    ))
                ) : (
                    <p>No se encontraron equipos del mundo.</p>
                )}
            </section>
        </main>
    );
}
