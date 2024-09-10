import React, { useEffect, useState } from 'react';
import './Recharge.css';
import { MoneyManageInstance } from '../../../../../money/applications/dependencyInjection/MoneyManageInstance';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { LoadingSourceUseCase } from '../../../../../shared/domain/usecase/LoadingSource.UseCase';
import { useNavigate } from 'react-router-dom';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';

export default function Recharge() {
    const navigate = useNavigate();
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
    if (loginData) {
        return (
            <main className="main-section">
                <section className="dashboard">
                    <div className="scheme">
                        <h2>Recargar</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                LoadingSourceUseCase.setLoading();
                                const galleons = e.currentTarget.galleons;
                                const sickles = e.currentTarget.sickles;
                                const knuts = e.currentTarget.knuts;

                                const nGalleons = parseInt(galleons.value);
                                const nSickles = parseInt(sickles.value);
                                const nKnuts = parseInt(knuts.value);

                                if (nGalleons >= 0 && nSickles >= 0 && nSickles < 17 && nKnuts >= 0 && nKnuts < 29) {
                                    MoneyManageInstance.rechargeMoney(
                                        { galleons: nGalleons, knuts: nKnuts, sickles: nSickles },
                                        loginData,
                                    ).finally(() => {
                                        LoadingSourceUseCase.unsetLoading();
                                    });
                                } else {
                                    nGalleons < 0 && (galleons.className = 'error-input');
                                    nSickles < 0 && (sickles.className = 'error-input');
                                    nSickles > 16 && (sickles.className = 'error-input');
                                    nKnuts < 0 && (knuts.className = 'error-input');
                                    nKnuts > 28 && (knuts.className = 'error-input');
                                    LoadingSourceUseCase.unsetLoading();
                                }
                            }}
                        >
                            <label htmlFor="galleons">Galleons:</label>
                            <input type="number" min={0} step={1} name="galleons" />

                            <label htmlFor="sickles">Sickles:</label>
                            <input type="number" min={0} max={16} step={1} name="sickles" />

                            <label htmlFor="knuts">Knuts:</label>
                            <input type="number" min={0} max={28} step={1} name="knuts" />

                            <br />
                            <br />
                            <input type="submit" value="Recargar" />
                        </form>
                    </div>
                </section>
            </main>
        );
    } else {
        return <>Unauthorized</>;
    }
}
