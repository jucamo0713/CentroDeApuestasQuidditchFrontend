import React, { useEffect, useState } from 'react';
import './Profile.css';
import { SessionManageInstance } from '../../../../../auth/applications/dependencyInjection/SessionManageInstance';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { LoadingSourceUseCase } from '../../../../../shared/domain/usecase/LoadingSource.UseCase';
import { useNavigate } from 'react-router-dom';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';

export default function Profile() {
    const navigate = useNavigate();
    // TODO
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loginData, setLoginData] = useState<SessionData | undefined>(undefined);
    useEffect(() => {
        SessionManageUseCase.subjectOfSessionData.subscribe({
            next: setLoginData,
        });
    }, []);

    useEffect(() => {
        SessionManageUseCase.subjectOfSessionData.subscribe({
            next: setLoginData,
        });
    }, []);
    return (
        <main className="main-section">
            <section className="dashboard">
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
                    className="magic-button"
                    value="CERRAR SESION"
                />
            </section>
        </main>
    );
}
