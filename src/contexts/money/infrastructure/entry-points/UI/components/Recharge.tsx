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
    const [selectedCurrency, setSelectedCurrency] = useState('galleons'); // Estado para la moneda seleccionada

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
                                const amountInput = e.currentTarget.amount;
                                const amountValue = parseInt(amountInput.value);

                                // Validar que el input no esté vacío o tenga valores negativos
                                if (amountInput.value === '' || isNaN(amountValue) || amountValue < 0) {
                                    amountInput.className = 'error-input';
                                    amountInput.setCustomValidity('El valor debe ser un número positivo.');
                                    amountInput.reportValidity();
                                    LoadingSourceUseCase.unsetLoading();
                                    return;
                                }

                                // Dependiendo de la moneda seleccionada, recargar la correspondiente
                                const rechargeData = {
                                    galleons: selectedCurrency === 'galleons' ? amountValue : 0,
                                    knuts: selectedCurrency === 'knuts' ? amountValue : 0,
                                    sickles: selectedCurrency === 'sickles' ? amountValue : 0,
                                };

                                MoneyManageInstance.rechargeMoney(rechargeData, loginData).finally(() => {
                                    LoadingSourceUseCase.unsetLoading();
                                });
                            }}
                        >
                            <label htmlFor="currency">Seleccionar moneda:</label>
                            <select
                                name="currency"
                                value={selectedCurrency}
                                onChange={(e) => setSelectedCurrency(e.target.value)}
                            >
                                <option value="galleons">Galleons</option>
                                <option value="sickles">Sickles</option>
                                <option value="knuts">Knuts</option>
                            </select>

                            <br />

                            <label htmlFor="amount">
                                {selectedCurrency.charAt(0).toUpperCase() + selectedCurrency.slice(1)}:
                            </label>
                            <input type="number" name="amount" min={0} step={1} required />

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
