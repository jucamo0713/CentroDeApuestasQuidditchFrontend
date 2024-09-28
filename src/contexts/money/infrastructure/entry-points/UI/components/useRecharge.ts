import React, { useEffect, useState } from 'react';
import { MoneyManageInstance } from '../../../../../money/applications/dependencyInjection/MoneyManageInstance';
import { SessionData } from '../../../../../auth/domain/model/SessionData';
import { LoadingSourceUseCase } from '../../../../../shared/domain/usecase/LoadingSource.UseCase';
import { useNavigate } from 'react-router-dom';
import { SessionManageUseCase } from '../../../../../auth/domain/usecase/SessionManage.UseCase';
import { toast } from 'react-toastify';
import { currencyConstants } from '../../../../domain/model/currencyConstants';

const useRecharge = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<SessionData | undefined>(undefined);
    const [selectedCurrency, setSelectedCurrency] = useState(currencyConstants.GALLEONS);
    const [amount, setAmount] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const processId = LoadingSourceUseCase.addLoaderProcess();

        const amountValue = parseInt(amount);
        if (isNaN(amountValue) || amountValue < 0) {
            toast.error('El valor debe ser un número positivo.');
            LoadingSourceUseCase.removeLoaderProcess(processId);
            return;
        }

        const rechargeData = {
            galleons: selectedCurrency === currencyConstants.GALLEONS ? amountValue : 0,
            knuts: selectedCurrency === currencyConstants.KNUTS ? amountValue : 0,
            sickles: selectedCurrency === currencyConstants.SICKLES ? amountValue : 0,
        };

        if (loginData) {
            MoneyManageInstance.rechargeMoney(rechargeData, loginData).finally(() => {
                LoadingSourceUseCase.removeLoaderProcess(processId);
            });
        }
    };

    useEffect(() => {
        const subscription = SessionManageUseCase.subjectOfSessionData.subscribe({
            next: (v) => {
                if (!v) {
                    navigate('/');
                } else {
                    setLoginData(v);
                }
            },
        });
        return () => subscription.unsubscribe();
    }, [navigate]);

    return {
        amount,
        handleSubmit,
        loginData,
        selectedCurrency,
        setAmount,
        setSelectedCurrency,
    };
};

export default useRecharge;
