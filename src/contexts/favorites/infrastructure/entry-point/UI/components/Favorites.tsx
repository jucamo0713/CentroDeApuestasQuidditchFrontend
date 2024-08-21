import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';

//TODO
export function Favorites() {
    const navigate = useNavigate();
    //TODO:

    const [loginData, setLoginData] = useState<SessionData | undefined>(undefined);
    useEffect(() => {
        SessionManageUseCase.subjectOfSessionData.subscribe({
            next: (v) => {
                if (!v) {
                    navigate('/');
                }
                setLoginData(v);
            },
        });
    }, [navigate]);
    return (
        <main className="main-section">
            <section className="dashboard">
                <h2>Equipos de Gran Bretaña e Irlanda</h2>
                <div className="scheme">
                    <h3>Appleby Arrows</h3>
                    <p>
                        Equipo del norte de inglaterra fundado en 1612. Mayor momento de gloria en 1923. Hay una
                        tradición rivalidad entre los Arrows y las Avispas de Wimbourne.
                    </p>
                    {loginData && <input type="button" value="Retirar de Favoritos" />}
                </div>
                <div className="scheme">
                    <h3>Murciélagos de Ballycastle</h3>
                    <p>
                        Ha ganado la Liga de quidditch un total de veintiseis veces, lo que lo convierte en el segundo
                        equipo más éxito en la historia de la competición.. Es el equipo más famoso de Irlanda del
                        Norte.
                    </p>
                    {loginData && <input type="button" value="Retirar de Favoritos" />}
                </div>
                <div className="scheme">
                    <h3>Pride of Portree</h3>
                    <p>
                        Fundado en 1292 en la Isla de Skye. Llamados como Los Prides han ganado dos veces La Liga en
                        1960.
                    </p>
                    {loginData && <input type="button" value="Retirar de Favoritos" />}
                </div>
                <div className="scheme">
                    <h3>Puddlemere United</h3>
                    <p>
                        Fundado en 1163 es el equipo más antiguo de La Liga. Posee veintedós titulos de la Liga y dos de
                        la Copa de Europa.
                    </p>
                    {loginData && <input type="button" value="Retirar de Favoritos" />}
                </div>
                <div className="scheme">
                    <h3>Tutshill Tornados</h3>
                    <p>
                        Fundado en 1520, disfrutó de su mayor racha de éxitos a principios del siglo XX, cuando ganó el
                        campeonato de Liga cinco veves seguidas, un record tanto en inglaterra como en Gran Bretaña.
                    </p>
                    {loginData && <input type="button" value="Retirar de Favoritos" />}
                </div>
                <div className="scheme">
                    <h3>Wigtown Wanderers</h3>
                    <p>Fundado en 1422 por los siete descendientes de un mago carnicero llamado Walter Parkin.</p>
                    {loginData && <input type="button" value="Retirar de Favoritos" />}
                </div>
            </section>

            <section className="dashboard">
                <h2>Equipos de Hogwarts</h2>
                <div className="scheme">
                    <h3>Gryffindor</h3>
                    <p>
                        Es una parte emblemática de la historia de Hogwarts. Fundado hace siglos junto con la fundación
                        de la escuela misma, el equipo de Gryffindor ha sido un contendiente destacado en el mundo del
                        Quidditch durante generaciones.
                    </p>
                    {loginData && <input type="button" value="Retirar de Favoritos" />}
                </div>
                <div className="scheme">
                    <h3>Slytherin</h3>
                    <p>
                        Conocido por su astucia, ambición y determinación en el campo de juego. Ha mantenido una
                        reputación de excelencia y competitividad en el Quidditch, gracias a su enfoque en la estrategia
                        y la victoria a cualquier costo.
                    </p>
                    {loginData && <input type="button" value="Retirar de Favoritos" />}
                </div>
            </section>
            <section className="dashboard">
                <h2>Equipos del mundo</h2>
                <div className="scheme">
                    <h3>Argentina</h3>
                    <p></p>
                    {loginData && <input type="button" value="Retirar de Favoritos" />}
                </div>
                <div className="scheme">
                    <h3>Irlanda</h3>
                    <p></p>
                    {loginData && <input type="button" value="Retirar de Favoritos" />}
                </div>
                <div className="scheme">
                    <h3>Nueva Zelanda</h3>
                    <p></p>
                    {loginData && <input type="button" value="Retirar de Favoritos" />}
                </div>
                <div className="scheme">
                    <h3>Australia</h3>
                    <p></p>
                    {loginData && <input type="button" value="Retirar de Favoritos" />}
                </div>
                <div className="scheme">
                    <h3>Uganda</h3>
                    <p></p>
                    {loginData && <input type="button" value="Retirar de Favoritos" />}
                </div>
                <div className="scheme">
                    <h3>Canadá</h3>
                    <p></p>
                    {loginData && <input type="button" value="Retirar de Favoritos" />}
                </div>
            </section>
        </main>
    );
}
