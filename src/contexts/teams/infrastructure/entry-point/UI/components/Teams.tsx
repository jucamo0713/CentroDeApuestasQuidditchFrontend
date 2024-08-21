import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';

//TODO
export function Teams() {
    const navigate = useNavigate();
    //TODO:

    const [loginData, setLoginData] = useState<SessionData | undefined>(undefined);
    useEffect(() => {
        SessionManageUseCase.subjectOfSessionData.subscribe({
            next: setLoginData,
        });
    }, [navigate]);
    const addToFavorites = () => {};
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
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Avispas de Wimbourne</h3>
                    <p>
                        Fundado en 1312. ha ganado dieciocho veces la liga y ha llegado hasta dos semifinales de la
                        Eurcopa.
                    </p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Caerphilly Catapults</h3>
                    <p>
                        Los Catapults de Gales se formaron en 1402. Tienen dieciocho triunfos en la liga y un célebre
                        triunfo en la final de la copa Europea de 1956.
                    </p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Chudley Cannons</h3>
                    <p>Han ganado la liga en veitiuna ocasiones, la ultima vez fue en 1892.</p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Falmouth Falcons</h3>
                    <p>Conocidos por jugar duro.</p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Holyhead Harpies</h3>
                    <p>Equipo Galés fundado en 1203. Único por sólo ha fichado brujas en toda su historia.</p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Kenmare Kestrels</h3>
                    <p>Equipo Irlandés fundado en 1291.</p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Montrose Magpies</h3>
                    <p>
                        Es el equipo que acumula más éxitos en la historia de la liga de Irlanda y Gran Bretaña, treinta
                        y dos ediciones. Han sido dos veces campeones de Europa.
                    </p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Murciélagos de Ballycastle</h3>
                    <p>
                        Ha ganado la Liga de quidditch un total de veintiseis veces, lo que lo convierte en el segundo
                        equipo más éxito en la historia de la competición.. Es el equipo más famoso de Irlanda del
                        Norte.
                    </p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Pride of Portree</h3>
                    <p>
                        Fundado en 1292 en la Isla de Skye. Llamados como Los Prides han ganado dos veces La Liga en
                        1960.
                    </p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Puddlemere United</h3>
                    <p>
                        Fundado en 1163 es el equipo más antiguo de La Liga. Posee veintedós titulos de la Liga y dos de
                        la Copa de Europa.
                    </p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Tutshill Tornados</h3>
                    <p>
                        Fundado en 1520, disfrutó de su mayor racha de éxitos a principios del siglo XX, cuando ganó el
                        campeonato de Liga cinco veves seguidas, un record tanto en inglaterra como en Gran Bretaña.
                    </p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Wigtown Wanderers</h3>
                    <p>Fundado en 1422 por los siete descendientes de un mago carnicero llamado Walter Parkin.</p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
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
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Hufflepuff</h3>
                    <p>
                        Conocido por su lealtad, trabajo en equipo y fair play en el campo de juego. Aunque no se
                        destaquen tanto como otros equipos en cuanto a trofeos y campeonatos, los Hufflepuff son
                        admirados por su ética de juego y su dedicación.
                    </p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Ravenclaw</h3>
                    <p>
                        Se destaca por su inteligencia estratégica, habilidades técnicas y precisión en el campo de
                        juego. Fundado junto con la creación de Hogwarts hace más de mil años, el equipo de Ravenclaw ha
                        mantenido una reputación de excelencia en el Quidditch, gracias a su enfoque en la astucia y la
                        planificación.
                    </p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Slytherin</h3>
                    <p>
                        Conocido por su astucia, ambición y determinación en el campo de juego. Ha mantenido una
                        reputación de excelencia y competitividad en el Quidditch, gracias a su enfoque en la estrategia
                        y la victoria a cualquier costo.
                    </p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
            </section>
            <section className="dashboard">
                <h2>Equipos del mundo</h2>
                <div className="scheme">
                    <h3>Argentina</h3>
                    <p></p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Brasil</h3>
                    <p></p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Perú</h3>
                    <p></p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Colombia</h3>
                    <p></p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Noruega</h3>
                    <p></p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Irlanda</h3>
                    <p></p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Nueva Zelanda</h3>
                    <p></p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Australia</h3>
                    <p></p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Uganda</h3>
                    <p></p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
                <div className="scheme">
                    <h3>Canadá</h3>
                    <p></p>
                    {loginData && <input type="button" value="Agregar a Favoritos" onClick={addToFavorites} />}
                </div>
            </section>
        </main>
    );
}
