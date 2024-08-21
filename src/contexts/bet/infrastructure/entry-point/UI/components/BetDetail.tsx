import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';

export function BetDetail() {
    const navigate = useNavigate();
    const { betId } = useParams();
    //TODO:
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    return <>{betId}</>;
}
