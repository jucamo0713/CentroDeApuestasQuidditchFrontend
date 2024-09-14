import React, { useEffect, useState } from 'react';
import './Profile.css';
import { SessionManageInstance } from '../../../../../auth/applications/dependencyInjection/SessionManageInstance';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { LoadingSourceUseCase } from '../../../../../shared/domain/usecase/LoadingSource.UseCase';
import { useNavigate } from 'react-router-dom';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';
import { BetHistory } from '../../../../../bet/infrastructure/entry-point/UI/molecule/BetHistory';
import { ProfileForm } from '../molecules/ProfileForm';

export default function Profile() {
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
                        <form className="form-edit">
                            <h2>Mi perfil</h2>
                            <ProfileForm loginData={loginData} />
                            <div className="buttons-container">
                                <input
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        LoadingSourceUseCase.setLoading();
                                        SessionManageInstance.closeSession().finally(() => {
                                            LoadingSourceUseCase.unsetLoading();
                                            navigate('/');
                                        });
                                    }}
                                    value="Cerrar sesión"
                                />
                            </div>
                        </form>
                    </div>
                </section>
                <BetHistory loginData={loginData} />
            </main>
        );
    } else {
        return <>Unauthorized</>;
    }
}
