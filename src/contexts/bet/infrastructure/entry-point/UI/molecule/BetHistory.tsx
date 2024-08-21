import React, { useEffect, useState } from 'react';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { PaginatedModel } from '../../../../../shared/domain/model/PaginatedModel';
import { Bet } from '../../../../domain/model/Bet';
import { BetUseCaseInstance } from '../../../../application/dependencyInjection/BetUseCaseInstance';
import { PaginationSelector } from '../../../../../shared/infrastructure/entry-points/UI/atoms/pagination/PaginationSelector';
import Balance from '../../../../../money/infrastructure/entry-points/UI/molecule/Balance';

const LIMIT_PER_PAGE = 5;

export function BetHistory(params: { loginData: SessionData }) {
    const [page, setPage] = useState(1);
    const [bets, setBets] = useState<PaginatedModel<Bet>>({
        data: [],
        metadata: { limit: 0, page, total: 0, totalPages: 0 },
    });
    useEffect(() => {
        BetUseCaseInstance.getBetsPaginated(page, LIMIT_PER_PAGE, params.loginData).then((v) => setBets(v));
    }, [page, params.loginData]);
    return (
        <section>
            <h2>Historial de Apuestas</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Valor</th>
                            <th>Multiplicador</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bets.data.map((v, i) => (
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
                                <td>{v.finished ? (v.won ? 'Ganada' : 'Perdida') : 'Pendiente'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <PaginationSelector totalPages={bets.metadata.totalPages} currentPage={page} pageSetter={setPage} />
            </div>
        </section>
    );
}
