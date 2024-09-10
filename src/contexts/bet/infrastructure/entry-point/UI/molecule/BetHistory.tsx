import React, { useEffect, useState } from 'react';
import './BetHistory.css';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { PaginatedModel } from '../../../../../shared/domain/model/PaginatedModel';
import { Bet } from '../../../../domain/model/Bet';
import { BetUseCaseInstance } from '../../../../application/dependencyInjection/BetUseCaseInstance';
import { PaginationSelector } from '../../../../../shared/infrastructure/entry-points/UI/atoms/pagination/PaginationSelector';
import Balance from '../../../../../money/infrastructure/entry-points/UI/molecule/Balance';
import { useNavigate } from 'react-router-dom';
import { AppRoutesConstants } from '../../../../../shared/domain/model/constants/AppRoutes.Constants';

const LIMIT_PER_PAGE = 5;

export function BetHistory(params: { loginData: SessionData }) {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [bets, setBets] = useState<PaginatedModel<Bet>>({
        data: [],
        metadata: { limit: 0, page, total: 0, totalPages: 0 },
    });
    useEffect(() => {
        BetUseCaseInstance.getBetsPaginated(page, LIMIT_PER_PAGE, params.loginData).then((v) => setBets(v));
    }, [page, params.loginData]);
    return (
        <section className="dashboard">
            <div className="scheme">
                <h2>Historial de Apuestas</h2>
                <div>
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Valor</th>
                                <th>Multiplicador</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bets.data.map((v, i) => {
                                const status = v.finished ? (v.won ? 'Ganada' : 'Perdida') : 'Pendiente';
                                return (
                                    <tr key={i}>
                                        <td>{1 + i + (page - 1) * LIMIT_PER_PAGE}</td>
                                        <td>
                                            <Balance
                                                galleons={v.value.galleons}
                                                knuts={v.value.knuts}
                                                sickles={v.value.sickles}
                                            />
                                        </td>
                                        <td>x{v.profit}</td>
                                        <td
                                            style={{
                                                color:
                                                    status === 'Ganada'
                                                        ? 'green'
                                                        : status === 'Perdida'
                                                          ? 'red'
                                                          : 'white',
                                            }}
                                        >
                                            {status}
                                        </td>
                                        <td>
                                            <input
                                                type="button"
                                                value="Detalle"
                                                onClick={() =>
                                                    navigate(AppRoutesConstants.BET_DETAIL.replace(':betId', v.betId))
                                                }
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <PaginationSelector totalPages={bets.metadata.totalPages} currentPage={page} pageSetter={setPage} />
                </div>
            </div>
        </section>
    );
}
